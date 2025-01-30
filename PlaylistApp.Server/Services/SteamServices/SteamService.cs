using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.DTOs.SteamData;
using System.Linq;
using System.Net.Http;
using System.Text.Json.Serialization;

namespace PlaylistApp.Server.Services.SteamServices;

public class SteamService : ISteamService
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;
    private readonly HttpClient client;
    private readonly IConfiguration config;

    public SteamService(IDbContextFactory<PlaylistDbContext> dbContextFactory, HttpClient client, IConfiguration config)
    {
        this.dbContextFactory = dbContextFactory;
        this.client = client;
        this.config = config;
    }

    public async Task<List<UserSteamGame>> GetGamesFromUserBasedOffOfSteamId(string steamId)
    {
        var steamKey = config["steamkey"];
        string url = $"https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key={steamKey}&steamid={steamId}&format=json";

        try
        {
            HttpResponseMessage response = await client.GetAsync(url);
            response.EnsureSuccessStatusCode();

            var jsonResponse = await response.Content.ReadFromJsonAsync<OwnedGamesResponse>();

            if (jsonResponse == null)
            {
                throw new Exception("Something went wrong parsing the data from Steam. Is the account private?");
            }

            var userSteamGames = await ParseSteamSummary(jsonResponse);
            return userSteamGames;

        }
        catch (HttpRequestException e)
        {
            Console.WriteLine("Request error: " + e.Message);
            throw new Exception();
        }
    }

    public void ConnectWithSteamUsingUserLogin()
    {
        throw new NotImplementedException();
    }

    public async Task<List<UserSteamGame>> ParseSteamSummary(OwnedGamesResponse response)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        List<SteamRawGame> games = response.Response.Games;

        HashSet<int> appIds = new HashSet<int>(games.Select(g => g.appid));
        Dictionary<int, int> playtimeDict = games.ToDictionary(g => g.appid, g => g.playtime_forever);

        var matchingPlatformGames = await context.PlatformGames
            .Where(pg => appIds.Any(appId => appId.ToString() == pg.PlatformKey))
            .Include(g => g.Game)
            .ToListAsync();

        var uniquePlatformGames = matchingPlatformGames.GroupBy(pg => pg.GameId).Select(pg => pg.First()).ToList();


        var userSteamGames = uniquePlatformGames.Select(platformGame => new UserSteamGame
        {
            PlatformGameId = platformGame.Id,
            GameTitle = platformGame.Game.Title ?? "Game!",
            SteamPlayTime = playtimeDict.GetValueOrDefault(int.Parse(platformGame.PlatformKey ?? ""), 0)
        }).ToList();



        return userSteamGames;

    }

}



public class OwnedGamesResponse
{
    public Response Response { get; set; } = new();
}

public class Response
{
    public int GameCount { get; set; }
    public List<SteamRawGame> Games { get; set; } = new();
}

public class SteamRawGame
{
    [JsonPropertyName("appid")]
    public int appid { get; set; }


    [JsonPropertyName("playtime_forever")]
    public int playtime_forever { get; set; }


    [JsonPropertyName("playtime_windows_forever")]
    public int playtime_windows_forever { get; set; }


    [JsonPropertyName("playtime_mac_forever")]
    public int playtime_mac_forever { get; set; }


    [JsonPropertyName("playtime_linux_forever")]
    public int playtime_linux_forever { get; set; }


    [JsonPropertyName("playtime_deck_forever")]
    public int playtime_deck_forever { get; set; }


    [JsonPropertyName("rtime_last_played")]
    public long rtime_last_played { get; set; }


    [JsonPropertyName("playtime_disconnected")]
    public int playtime_disconnected { get; set; }
}
