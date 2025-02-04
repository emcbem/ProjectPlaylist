using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.DTOs.SteamData;
using System.Linq;
using System.Net.Http;

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

    public async Task<List<DTOs.SteamData.SteamActionItem>> GetGamesFromUserBasedOffOfSteamId(string steamId)
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

    public async Task<List<DTOs.SteamData.SteamActionItem>> ParseSteamSummary(OwnedGamesResponse response)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        List<SteamRawGame> games = response.Response.Games;

        HashSet<int> appIds = new HashSet<int>(games.Select(g => g.AppId));
        Dictionary<int, int> playtimeDict = games.ToDictionary(g => g.AppId, g => g.PlaytimeForever);

        var matchingPlatformGames = await context.PlatformGames
            .Where(pg => appIds.Any(appId => appId.ToString() == pg.PlatformKey))
            .Include(g => g.Game)
            .ToListAsync();

        var uniquePlatformGames = matchingPlatformGames.GroupBy(pg => pg.GameId).Select(pg => pg.First()).ToList();

        var userSteamGames = uniquePlatformGames.Select(platformGame => new SteamActionItem
        {
            PlatformGameId = platformGame.Id,
            GameTitle = platformGame.Game.Title ?? string.Empty,
            TotalPlayTime = playtimeDict.GetValueOrDefault(int.Parse(platformGame.PlatformKey ?? ""), 0),
            ProblemText = "Problem Text",   // depends on the type of problem. 
            Url = "some URL for something", // url of a special place in our system that we will redirect users to?
            ImageUrl = platformGame.Game.CoverUrl ?? string.Empty,  // default image?
        }).ToList();



        return userSteamGames;

    }

}
