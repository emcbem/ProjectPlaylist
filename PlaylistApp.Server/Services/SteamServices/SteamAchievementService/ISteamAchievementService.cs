using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs.SteamData.SteamAchievements;

namespace PlaylistApp.Server.Services.SteamServices.SteamAchievementService.SteamAchievementService
{
    public interface ISteamAchievementService
    {
        Task<List<PlayerStatsResponse>> GetSteamAchievementsFromSteam(int userId, string steamId, List<PlatformGame> platformGames);
    }
}