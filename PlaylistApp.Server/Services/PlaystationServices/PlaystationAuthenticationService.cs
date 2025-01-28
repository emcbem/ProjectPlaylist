using PlaylistApp.Server.DTOs.PlaystationData;
using System.Text.Json;
using System.Web;
using PsnApiWrapperNet;
using PsnApiWrapperNet.Model;
using System.Net.Http.Headers;
using System.Net.Http;

namespace PlaylistApp.Server.Services.PlaystationServices;

public class PlaystationAuthenticationService
{
    private readonly HttpClient httpClient = new();
    private readonly IConfiguration config;

    public PlaystationAuthenticationService(IConfiguration configuration)
    {
        config = configuration;
    }

    public async Task GetPlaystationAuthenticationToken(string npsso)
    {
        if (string.IsNullOrEmpty(npsso))
        {
            throw new Exception("NPSSO value is required to get authentication token from playstation.");
        }

        var parameters = new Dictionary<string, string>()
        {
            {"access_type", "offline" },
            {"client_id", "09515159-7237-4370-9b40-3806e67c0891" },
            {"response_type", "code" },
            {"scope", "psn:mobile.v2.core psn:clientapp" },
            { "redirect_uri", "com.scee.psxandroid.scecompcall://redirect"}
        };

        var url = "https://ca.account.sony.com/api/authz/v3/oauth/authorize?" + string.Join("&", parameters.Select(p => $"{p.Key}={p.Value}"));

        try
        {
            var request = new HttpRequestMessage(HttpMethod.Get, url);
            request.Headers.Add("Cookie", $"npsso={npsso}");

            var response = await httpClient.SendAsync(request);

            if (response.Headers.Location != null && response.Headers.Location.Query.Contains("?code=v3"))
            {
                var query = HttpUtility.ParseQueryString(response.Headers.Location.Query);

                string code = query["code"]!;

                // Exchange authorization code for tokens
                await ExchangeAuthorizationCodeForTokenAsync(code);
            }
            else
            {
                Console.WriteLine("Error: Unable to retrieve authorization code. Check npsso token.");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
    }

    private async Task ExchangeAuthorizationCodeForTokenAsync(string code)
    {
        var tokenUrl = "https://ca.account.sony.com/api/authz/v3/oauth/token";

        var body = new Dictionary<string, string>
        {
            { "code", code },
            { "redirect_uri", "com.scee.psxandroid.scecompcall://redirect" },
            { "grant_type", "authorization_code" },
            { "token_format", "jwt" }
        };

        var requestContent = new FormUrlEncodedContent(body);

        var request = new HttpRequestMessage(HttpMethod.Post, tokenUrl)
        {
            Content = requestContent
        };

        request.Headers.Add("Authorization", "Basic MDk1MTUxNTktNzIzNy00MzcwLTliNDAtMzgwNmU2N2MwODkxOnVjUGprYTV0bnRCMktxc1A=");

        try
        {
            var response = await httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();

            var jsonResponse = await response.Content.ReadAsStringAsync();
            var tokenResponse = JsonSerializer.Deserialize<PlaystationContext>(jsonResponse);

            if (!string.IsNullOrWhiteSpace(tokenResponse?.AccessToken))
            {
                Console.WriteLine("Authentication Token successfully granted.");
                Console.WriteLine($"AccessToken: {tokenResponse.AccessToken}");
                Console.WriteLine($"TokenType: {tokenResponse.TokenType}");
                Console.WriteLine($"ExpiresIn: {tokenResponse.ExpiresIn}");
                Console.WriteLine($"Scope: {tokenResponse.Scope}");
                Console.WriteLine($"IdToken: {tokenResponse.IdToken}");
                Console.WriteLine($"RefreshToken: {tokenResponse.RefreshToken}");
            }
            else
            {
                Console.WriteLine("Error: Unable to obtain Authentication Token.");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: Unable to obtain Authentication Token. Details: {ex.Message}");
        }
    }

    public async Task<List<PlaystationUserDTO>> SearchPlayer(string userName)
    {
        PAWN pawn = new(config["npsso"]);
        List<PlaystationUserDTO> playstationUsers = new();

        try
        {
            var response = await pawn.SearchPlayerAsync(userName);

            foreach(var user in response.domainResponses)
            {

                foreach (var result in user.results)
                {
                    PlaystationUserDTO possiblePlaystationUser = new();

                    possiblePlaystationUser.AccountId = result.socialMetadata.accountId;
                    possiblePlaystationUser.OnlineId = result.socialMetadata.onlineId;
                    possiblePlaystationUser.AvatarUrl = result.socialMetadata.avatarUrl;

                    playstationUsers.Add(possiblePlaystationUser);
                }

            }

            return playstationUsers;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Failed to get user for username: {userName}. Details: {ex.Message}");
        }

        return new List<PlaystationUserDTO>();
    }
}
