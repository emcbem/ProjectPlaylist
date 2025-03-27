using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Services.IGDBServices;
using PlaylistApp.Server.Services.UserAchievementServices;

namespace PlaylistApp.Server.Services.SteamServices.SteamAchievementService;

public class SteamAchievementService : ISteamAchievementService
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;
    private readonly HttpClient client;
    private readonly IConfiguration config;
    private readonly IUserAchievementService userAchievementService;

    public SteamAchievementService(IDbContextFactory<PlaylistDbContext> dbContextFactory, HttpClient client, IConfiguration config, IUserAchievementService userAchievementService)
    {
        this.dbContextFactory = dbContextFactory;
        this.client = client;
        this.config = config;
        this.userAchievementService = userAchievementService;
    }

    public async Task AddMissingAchievementsToUser(Guid userGuid, string steamId, int? pgid = null)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();
        var steamKey = config["steamkey"];

        var user = await GetUserFromGuidAsync(context, userGuid);


        if (pgid.HasValue)
        {
            await AddMissingAchievementsForSingleGame(user, steamId, pgid.Value);
        }
        else
        {
            await AddMissingAchievementsForAllGames(user, steamId);
        }

    }

    public async Task AddMissingAchievementsForSingleGame(UserAccount user, string steamId, int pgid)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        UserGame? userPlatformGame = await context.UserGames
            .Where(x => x.UserId == user.Id && x.PlatformGameId == pgid)
            .Include(x => x.PlatformGame)
            .FirstOrDefaultAsync();
        if (userPlatformGame is null || userPlatformGame.PlatformGame.PlatformKey is null) return;

        string userPgsPlatformKey = userPlatformGame.PlatformGame.PlatformKey;
        if (userPgsPlatformKey is null) return;

        List<PlayerStatsResponse> playerStatsResponse = await GetAllSteamAchievementsFromSteam(new List<string>() { userPgsPlatformKey }, steamId);

        var usersCurrentAchievements = await context.UserAchievements
            .Where(x => x.UserId == user.Id && x.Achievement.PlatformGameId == pgid)
            .Include(a => a.Achievement)
            .ThenInclude(pg => pg.PlatformGame)
            .ToListAsync();

        var allPlatformGameAchievements = await context.Achievements
               .Where(a => a.PlatformGameId == pgid)
               .ToListAsync();

        AddMultipleUserAchievementRequest AddAchievementsRequest = new() { UserGuid = user.Guid };


        foreach (var jsonResponse in playerStatsResponse)
        {
            foreach (var ach in jsonResponse.PlayerStats.Achievements)
            {
                var matchingAch = usersCurrentAchievements.Where(x => x.Achievement.ExternalId == ach.Apiname).Where(x => x.Achievement.PlatformGame.Id == pgid).FirstOrDefault();
                if (ach.Achieved == 1 && matchingAch is null)
                {
                    var projectPlaylistAchievement = allPlatformGameAchievements
                        .FirstOrDefault(x => x.PlatformGameId == pgid && x.ExternalId == ach.Apiname);

                    if (projectPlaylistAchievement is not null)
                    {
                        AddUserAchievementRequest request = new()
                        {
                            UserGuid = user.Guid,
                            IsSelfSubmitted = false,
                            DateAchieved = Conversions.UnixTimeToDateTime(ach.UnlockTime),
                            AchievementId = projectPlaylistAchievement.Id,
                        };
                        AddAchievementsRequest.UserAchievementRequests.Add(request);
                    }
                }
            }
        }

        await userAchievementService.AddMultipleUserAchievement(AddAchievementsRequest);
    }

    public async Task AddMissingAchievementsForAllGames(UserAccount user, string steamId)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();
        var userPlatformGames = await context.UserGames.Where(x => x.UserId == user.Id).Include(x => x.PlatformGame).ToListAsync();
        HashSet<int> userPlatformGameIds = new(userPlatformGames.Select(x => x.PlatformGameId));
        List<string> userPgsPlatformKeys = new(userPlatformGames.Select(x => x.PlatformGame.PlatformKey ?? string.Empty));


        List<PlayerStatsResponse> playerStatsResponse = await GetAllSteamAchievementsFromSteam(userPgsPlatformKeys, steamId);

        var usersCurrentAchievements = await context.UserAchievements
            .Where(x => x.UserId == user.Id)
            .Include(a => a.Achievement)
            .ThenInclude(pg => pg.PlatformGame)
            .ToListAsync();

        AddMultipleUserAchievementRequest AddAchievementsRequest = new() { UserGuid = user.Guid };


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
                        var matchingAch = usersCurrentAchievements.Where(x => x.Achievement.ExternalId == ach.Apiname).Where(x => x.Achievement.PlatformGame.Id == pg.Id).FirstOrDefault();
                        if (ach.Achieved == 1 && matchingAch is null)
                        {
                            var projectPlaylistAchievement = allPlatformGameAchievements
                                .FirstOrDefault(x => x.PlatformGameId == pg.PlatformGameId && x.ExternalId == ach.Apiname);

                            if (projectPlaylistAchievement is not null)
                            {
                                AddUserAchievementRequest request = new()
                                {
                                    UserGuid = user.Guid,
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

    public async Task<List<PlayerStatsResponse>> GetAllSteamAchievementsFromSteam(List<string> userPgsPlatformKeys, string steamId)
    {
        List<PlayerStatsResponse> responses = new();

        var steamKey = config["steamkey"];
        foreach (var key in userPgsPlatformKeys)
        {
            string url = $"https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid={key}&key={steamKey}&steamid={steamId}";
            HttpResponseMessage response = await client.GetAsync(url);

            responses.Add(await response.Content.ReadFromJsonAsync<PlayerStatsResponse>() ?? new PlayerStatsResponse());
        }

        return responses
            .SelectMany(x => x.PlayerStats.Achievements, (response, achievement) => new { response, achievement })
            .GroupBy(x => x.achievement.Apiname)
            .Select(g => g.First().response)
            .Distinct()
            .ToList();
    }

    public async void AddMissingActionsAfterResolvingGameCollision(List<string> pgIds, Guid userGuid)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();
        var user = await GetUserFromGuidAsync(context, userGuid);

        var userPlatform = await context.UserPlatforms.Where(x => x.UserId == user.Id).FirstOrDefaultAsync();
        if (userPlatform is null)
        {
            throw new Exception("No user platform found with the given id");
        }

        var userSteamKey = userPlatform.ExternalPlatformId;



        List<PlayerStatsResponse> responses = await GetAllSteamAchievementsFromSteam(pgIds, userSteamKey);

        await AddMissingAchievementsToUser(user.Guid, userSteamKey);
    }

    public async Task<UserAccount> GetUserFromGuidAsync(PlaylistDbContext context, Guid userId)
    {
        var user = await context.UserAccounts.Where(x => x.Guid == userId).FirstOrDefaultAsync();

        if (user is null)
        {
            throw new Exception("No user found with the given id");
        }
        return user;
    }
}