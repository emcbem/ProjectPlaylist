
using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.SteamData;

namespace PlaylistApp.Server.Services.IGDBSyncServices.AchievementGetter;

public class AchievementUpdater : IAchievementUpdater
{
    private readonly IHttpClientFactory httpClientFactory;
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;
    private readonly IConfiguration config;

    public AchievementUpdater(IHttpClientFactory httpClientFactory, IDbContextFactory<PlaylistDbContext> dbContextFactory, IConfiguration config)
    {
        this.httpClientFactory = httpClientFactory;
        this.dbContextFactory = dbContextFactory;
        this.config = config;
    }

    public  Task<List<Data.Achievement>?> GetPlaystationAchievementsForGame(string playstationKey)
    {
        throw new NotImplementedException();
    }

    public async Task<List<Data.Achievement>?> GetSteamAchievementsForGame(string steamKey, int? platformGameId)
    {
        if(platformGameId is null)
        {
            return null;
        }

        var httpClient = httpClientFactory.CreateClient();

        SteamGameAchievementDTO? steamGameAchievements = null ;
        try
        {
            steamGameAchievements = await httpClient.GetFromJsonAsync<SteamGameAchievementDTO>($"https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key={config["steamkey"]}&appid={steamKey}");
        }
        catch (HttpRequestException)
        {
            Console.WriteLine($"Unable to find steam game with externalID of {steamKey}");
        }

        if(steamGameAchievements is null)
        {
            return null;
        }

        if (steamGameAchievements.game is null)
        {
            return null;
        }

        if(steamGameAchievements.game.availableGameStats is null)
        {
            return null;
        }

        if(steamGameAchievements.game.availableGameStats.achievements is null)
        {
            return null;
        }


        return steamGameAchievements.game.availableGameStats.achievements.Select(steamAchievement =>
        {
            return new Data.Achievement()
            {
                AchievementDesc = steamAchievement.description,
                AchievementName = steamAchievement.displayName ?? "DEFAULT NAME",
                ImageUrl = steamAchievement.icon,
                PlatformGameId = platformGameId ?? throw new Exception("God willed this error, let us rejoice"),
                ExternalId = steamAchievement.name
            };
        }).ToList();

    }

    public async Task UpdatePlatformGames(List<PlatformGame> platformGames)
    {
        var context = await dbContextFactory.CreateDbContextAsync();

        //TODO REMOVE THIS LINE
        platformGames = context.PlatformGames.ToList();
        //END


        var gamesGroupedByPlatform = platformGames.GroupBy(x => x.PlatformId).ToList();

        var steamGames = gamesGroupedByPlatform
                        .Where(g => g.Key == 6)
                        .SelectMany(g => g)
                        .ToList();


        foreach (var game in steamGames)
        {
            if(game.PlatformKey is not null && game.PlatformKey != string.Empty)
            {
                var achievementsFound = await GetSteamAchievementsForGame(game.PlatformKey, game.Id);
                if(achievementsFound != null)
                {
                    context.Achievements.AddRange(achievementsFound);
                }
            }
        }
    }
}
