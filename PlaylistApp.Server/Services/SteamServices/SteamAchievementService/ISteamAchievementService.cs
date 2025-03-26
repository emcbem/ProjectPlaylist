using PlaylistApp.Server.Data;

namespace PlaylistApp.Server.Services.SteamServices.SteamAchievementService;

public interface ISteamAchievementService
{
    Task AddMissingAchievementsForAllGames(UserAccount user, string steamId);
    Task AddMissingAchievementsForSingleGame(UserAccount user, string steamId, int pgid);
    Task AddMissingAchievementsToUser(Guid userGuid, string steamId, int? pgid = null);
    void AddMissingActionsAfterResolvingGameCollision(List<string> pgIds, Guid userGuid);
    Task<List<PlayerStatsResponse>> GetAllSteamAchievementsFromSteam(List<string> userPgsPlatformKeys, string steamId);
    Task<UserAccount> GetUserFromGuidAsync(PlaylistDbContext context, Guid userId);
}
