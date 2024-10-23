using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Services.Achievement;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class AchievementController : Controller
{
    private readonly IAchievementService achievementService;

    public AchievementController(IAchievementService achievementService)
    {
        this.achievementService = achievementService;
    }

    [HttpGet("getachievementsbygame")]
    public async Task<List<AchievementDTO>> GetAchievementsByGame(int gameId)
    {
        return await achievementService.GetAchievementsByGame(gameId);
    }

    [HttpGet("getachievementbyid")]
    public async Task<AchievementDTO> GetAchievementById(int achievementId)
    {
        return await achievementService.GetAchievementById(achievementId);
    }

    [HttpGet("getachievementbyname")]
    public async Task<List<AchievementDTO>> GetAchievementsByName(string achievementName)
    {
        return await achievementService.GetAchievementsByName(achievementName);
    }
}
