using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;
using PlaylistApp.Server.Services.UserAchievementServices;

namespace PlaylistApp.Server.Controllers;
[ApiController]
[Route("[controller]")]
public class UserAchievementController : Controller
{
    private readonly IUserAchievementService userAchievementService;

    public UserAchievementController(IUserAchievementService userAchievementService)
    {
        this.userAchievementService = userAchievementService;
    }

    [HttpPost("adduserachievement")]
    public async Task<int> AddUserAchievement(AddUserAchievementRequest request)
    {
        return await userAchievementService.AddUserAchievement(request);
    }

    [HttpDelete("deleteuserachievement")]
    public async Task<bool> DeleteUserAchievement(int id)
    {
        return await userAchievementService.DeleteUserAchievement(id);
    }

    [HttpGet("getuserachievementbyachievementid")]
    public async Task<List<UserAchievementDTO>> GetUserAchievementByAchievementId(int achievementId)
    {
        return await userAchievementService.GetUserAchievementByAchievementId(achievementId);
    }

    [HttpGet("getuserachievementbyid")]
    public async Task<UserAchievementDTO> GetUserAchievementById(int userAchievementId)
    {
        return await userAchievementService.GetUserAchievementById(userAchievementId);
    }

    [HttpGet("getuserachievementbyuserid")]
    public async Task<List<UserAchievementDTO>> GetUserAchievementByUserId(Guid userId)
    {
        return await userAchievementService.GetUserAchievementByUserId(userId);
    }

    [HttpPatch("updateuserachievement")]
    public async Task<UserAchievementDTO> UpdateuserAchievement(UpdateUserAchievementRequest request)
    {
        return await userAchievementService.UpdateUserAchievement(request);
    }
}
