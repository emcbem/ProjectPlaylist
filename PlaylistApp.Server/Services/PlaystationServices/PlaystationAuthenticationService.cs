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

    public async Task<PlaystationContext> GetPlaystationAuthenticationToken()
    {
        var npsso = config["npsso"];

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

                return await ExchangeAuthorizationCodeForTokenAsync(code);
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
        return new PlaystationContext();
    }

    private async Task<PlaystationContext> ExchangeAuthorizationCodeForTokenAsync(string code)
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
                return tokenResponse;
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
        return new PlaystationContext();
    }
}
