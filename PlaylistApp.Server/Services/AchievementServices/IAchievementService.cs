using PlaylistApp.Server.DTOs;

namespace PlaylistApp.Server.Services.Achievement;

public interface IAchievementService
{
    public Task<AchievementDTO> GetAchievementById(int id);
    public Task<List<AchievementDTO>> GetAchievementsByName(string name);
    public Task<List<AchievementDTO>> GetAchievementsByGame(int id);
}
