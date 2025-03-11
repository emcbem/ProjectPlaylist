using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Services.IGDBServices;
using PlaylistApp.Server.Services.SteamServices.SteamAchievementService.SteamAchievementService;
using PlaylistApp.Server.Services.UserAchievementServices;

namespace PlaylistApp.Server.Services.SteamServices.SteamAchievementService;

public class SteamAchievementService2 : ISteamAchievementService
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;
    private readonly HttpClient client;
    private readonly IConfiguration config;
    private readonly IUserAchievementService userAchievementService;

    public SteamAchievementService2(IDbContextFactory<PlaylistDbContext> dbContextFactory, HttpClient client, IConfiguration config, IUserAchievementService userAchievementService)
    {
        this.dbContextFactory = dbContextFactory;
        this.client = client;
        this.config = config;
        this.userAchievementService = userAchievementService;
    }

    public async Task AddMissingAchievementsToUser(Guid userId, string steamId)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();
        var steamKey = config["steamkey"];

        var user = await context.UserAccounts.Where(x => x.Guid == userId).FirstOrDefaultAsync();

        if (user is null)
        {
            throw new Exception("Failed to sync Steam Achievements because User was not found.");
        }

        var userPlatformGames = await context.UserGames.Where(x => x.UserId == user.Id).Include(x => x.PlatformGame).ToListAsync();
        HashSet<int> userPlatformGameIds = new(userPlatformGames.Select(x => x.PlatformGameId));
        List<string> userPgsPlatformKeys = new(userPlatformGames.Select(x => x.PlatformGame.PlatformKey ?? string.Empty));

        List<PlayerStatsResponse> playerStatsResponse = await GetAllSteamAchievements(userPgsPlatformKeys, steamId);

        var userAchievements = await context.UserAchievements.Where(x => x.UserId == user.Id).Include(a => a.Achievement).ThenInclude(pg => pg.PlatformGame).ToListAsync();

        AddMultipleUserAchievementRequest AddAchievementsRequest = new();
        AddAchievementsRequest.UserGuid = userId;

        try
        {
            var allPlatformGameAchievements = await context.Achievements
                    .Where(a => userPlatformGameIds.Contains(a.PlatformGameId))
                    .ToListAsync();
            foreach (var pg in userPlatformGames)
            {
                if (pg.PlatformGame.PlatformKey is not null)
                {
                    foreach (var jsonResponse in playerStatsResponse)
                    {
                        foreach (var ach in jsonResponse.PlayerStats.Achievements)
                        {
                            var matchingAch = userAchievements.Where(x => x.Achievement.ExternalId == ach.Apiname).Where(x => x.Achievement.PlatformGame.Id == pg.Id).FirstOrDefault();
                            if (ach.Achieved == 1 && matchingAch is null)
                            {
                                //var projectPlaylistAchievement = await context.Achievements.Where(x => x.PlatformGameId == pg.PlatformGameId && x.ExternalId == ach.Apiname).FirstOrDefaultAsync(); // Make this line faster and maybe not use the context every time

                                var projectPlaylistAchievement = allPlatformGameAchievements
                                    .FirstOrDefault(x => x.PlatformGameId == pg.PlatformGameId && x.ExternalId == ach.Apiname);

                                if (projectPlaylistAchievement is not null)
                                {
                                    AddUserAchievementRequest request = new()
                                    {
                                        UserGuid = userId,
                                        IsSelfSubmitted = false,
                                        DateAchieved = Conversions.UnixTimeToDateTime(ach.UnlockTime),
                                        AchievementId = projectPlaylistAchievement.Id,
                                    };
                                    AddAchievementsRequest.UserAchievementRequests.Add(request);
                                }
                            }
                        }
                    }
                }
            }
            await userAchievementService.AddMultipleUserAchievement(AddAchievementsRequest);
        }
        catch (HttpRequestException e)
        {
            throw new Exception("An Error occured when fetching achievements from Steam: " + e.Message);
        }
    }

    public async Task<List<PlayerStatsResponse>> GetAllSteamAchievements(List<string> userPgsPlatformKeys, string steamId)
    {
        List<PlayerStatsResponse> responses = new();

        var steamKey = config["steamkey"];
        foreach (var key in userPgsPlatformKeys)
        {
            string url = $"https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid={key}&key={steamKey}&steamid={steamId}";
            HttpResponseMessage response = await client.GetAsync(url);

            responses.Add(await response.Content.ReadFromJsonAsync<PlayerStatsResponse>() ?? new PlayerStatsResponse());
        }

        return responses;
    }
}