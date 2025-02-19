using IGDB.Models;
using Microsoft.EntityFrameworkCore;
using NSubstitute;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs.SteamData.SteamAchievements;
using PlaylistApp.Server.DTOs.SteamData.SteamGames;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Services.IGDBServices;
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

    public async Task<List<SteamAchievement>> GetEarnedAchievementsFromSteamFromUserId(Guid userId, string steamId, List<PlatformGame> platformGamesFromSteam)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();
        var steamKey = config["steamkey"];

        var user = await context.UserAccounts.Where(x => x.Guid == userId).FirstOrDefaultAsync();

        if (user is null)
        {
            throw new Exception("Failed to sync Steam Achievements because User was not found.");
        }

        var userAchievements = await context.UserAchievements.Where(x => x.UserId == user.Id).Include(a => a.Achievement).ToListAsync();

        List<PlayerStatsResponse> playerStats = new();
        try
        {
            foreach (var game in platformGamesFromSteam)
            {
                if (game.PlatformKey is not null)
                {
                    string url = $"https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid={game.PlatformKey}&key={steamKey}&steamid={steamId}";
                    HttpResponseMessage response = await client.GetAsync(url);

                    PlayerStatsResponse jsonResponse = await response.Content.ReadFromJsonAsync<PlayerStatsResponse>() ?? new PlayerStatsResponse();

                    playerStats.Add(jsonResponse);
                }
            }

            return playerStats.SelectMany(x => x.PlayerStats.Achievements).Where(x => x.Achieved == 1).ToList();
        }
        catch (HttpRequestException e)
        {
            throw new Exception("An Error occured when fetching achievements from Steam: " + e.Message);
        }
    }


    public async Task AddSteamAchievementsToUser(List<SteamAchievement> listOfAchievementsFound, Guid userId, List<PlatformGame> platformGamesFromSteam)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var user = await context.UserAccounts.Where(x => x.Guid == userId).FirstOrDefaultAsync();

        if (user is null)
        {
            throw new Exception("Failed to sync Steam Achievements because User was not found.");
        }

        var userAchievements = await context.UserAchievements.Where(x => x.UserId == user.Id).Include(a => a.Achievement).ToListAsync();

        List<AddUserAchievementRequest> requests = new();

        foreach (var pg in platformGamesFromSteam)
        {
            foreach (var steamAchievement in listOfAchievementsFound)
            {

                var matchingAchievement = userAchievements.Where(x => x.Achievement.PlatformGameId == pg.Id && x.Achievement.ExternalId == steamAchievement.Apiname).FirstOrDefault();

                if (matchingAchievement == null)
                {
                    var ach = await context.Achievements.Where(x => x.PlatformGameId == pg.Id && x.ExternalId == steamAchievement.Apiname).FirstOrDefaultAsync();

                    if (ach is null)
                    {
                        //
                    }
                    AddUserAchievementRequest request = new()
                    {
                        UserGuid = userId,
                        IsSelfSubmitted = false,
                        DateAchieved = Conversions.UnixTimeToDateTime(steamAchievement.UnlockTime),
                        AchievementId = ach.Id,
                    };

                    requests.Add(request);
                }
            }
        }

    }

}