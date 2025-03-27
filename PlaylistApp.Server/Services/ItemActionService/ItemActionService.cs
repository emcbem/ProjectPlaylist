using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.Services.SteamServices.SteamAchievementService;
using PlaylistApp.Server.Services.UserPlatformServices;

namespace PlaylistApp.Server.Services.ItemActionService;

public class ItemActionService : IItemActionService
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;
    private readonly IUserPlatformService userPlatformService;
    private readonly ISteamAchievementService steamAchievementService;

    public ItemActionService(IDbContextFactory<PlaylistDbContext> dbContextFactory, IUserPlatformService userPlatformService, ISteamAchievementService steamAchievementService)
    {
        this.dbContextFactory = dbContextFactory;
        this.userPlatformService = userPlatformService;
        this.steamAchievementService = steamAchievementService;
    }

    public async Task ResolveDifferencesInAchievements(int newUserGameId, Guid userId)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var gameJustMade = await context.UserGames.Where(x => x.Id == newUserGameId).FirstOrDefaultAsync();


        if (gameJustMade is null || gameJustMade.PlatformGame is null)
        {
            throw new Exception("Failed adding user platform game");
        }

        var platformIdOfGameJustMade = gameJustMade.PlatformGame.PlatformKey;

        var usersPlatforms = await userPlatformService.GetAllByUser(userId);

        string userExternalPlatformId = string.Empty;
        foreach (var up in usersPlatforms)
        {
            if (up.PlatformId == 6 || up.PlatformId == 163)
            {
                userExternalPlatformId = up.ExternalPlatformId!;
            }
        }

        if ((gameJustMade.PlatformGame.Platform.Id == 6 || gameJustMade.PlatformGame.Platform.Id == 163) && !userExternalPlatformId.IsNullOrEmpty())
        {
            await steamAchievementService.AddMissingAchievementsToUser(userId, userExternalPlatformId);
        }
    }
}
