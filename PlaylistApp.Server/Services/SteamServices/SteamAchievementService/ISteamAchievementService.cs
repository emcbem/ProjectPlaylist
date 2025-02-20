using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs.SteamData.SteamAchievements;

namespace PlaylistApp.Server.Services.SteamServices.SteamAchievementService.SteamAchievementService
{
    public interface ISteamAchievementService
    {
        Task AddMissingAchievementsToUser(Guid userId, string steamId);
    }
}