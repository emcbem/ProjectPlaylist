using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs.SteamData.SteamAchievements;
using PlaylistApp.Server.DTOs.SteamData.SteamGames;
using PlaylistApp.Server.Services.SteamServices.SteamAchievementService.SteamAchievementService;

namespace PlaylistApp.Server.Services.SteamServices.SteamAchievementService;

public class SteamAchievementService2 : ISteamAchievementService
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;
    private readonly HttpClient client;
    private readonly IConfiguration config;

    public SteamAchievementService2(IDbContextFactory<PlaylistDbContext> dbContextFactory, HttpClient client, IConfiguration config)
    {
        this.dbContextFactory = dbContextFactory;
        this.client = client;
        this.config = config;
    }
    public async Task<List<PlayerStatsResponse>> GetSteamAchievementsFromSteam(int userId, string steamId, List<PlatformGame> platformGames)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var userAchievements = await context.UserAchievements.Where(x => x.UserId == userId).ToListAsync();

        var steamKey = config["steamkey"];

        List<PlayerStatsResponse> playerStats = new List<PlayerStatsResponse>();
        try
        {
            foreach (var game in platformGames)
            {
                if (game.PlatformKey is not null)
                {
                    string url = $"https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid={game.PlatformKey}&key={steamKey}&steamid={steamId}";
                    HttpResponseMessage response = await client.GetAsync(url);

                    //response.EnsureSuccessStatusCode();
                    PlayerStatsResponse jsonResponse = await response.Content.ReadFromJsonAsync<PlayerStatsResponse>() ?? new PlayerStatsResponse();

                    playerStats.Add(jsonResponse);
                }
            }

            return playerStats;
        }
        catch (HttpRequestException e)
        {
            throw new Exception("An Error occured when fetching achievements from Steam: " + e.Message);
        }

    }

}