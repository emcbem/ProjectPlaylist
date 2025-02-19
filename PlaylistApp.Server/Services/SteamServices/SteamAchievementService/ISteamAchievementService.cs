using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs.SteamData.SteamAchievements;

namespace PlaylistApp.Server.Services.SteamServices.SteamAchievementService.SteamAchievementService
{
    public interface ISteamAchievementService
    {
        Task<List<SteamAchievement>> GetEarnedAchievementsFromSteamFromUserId(Guid userId, string steamId, List<PlatformGame> platformGamesFromSteam);

        Task AddSteamAchievementsToUser(List<SteamAchievement> listOfAchievementsFound, Guid userId, List<PlatformGame> platformGamesFromSteam);
    }
}