using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.DeleteRequests;
using PlaylistApp.Server.Services.UserAchievementLikeServices;

namespace PlaylistApp.Server.Controllers;
[ApiController]
[Route("[controller]")]
public class UserAchievementLikeController : Controller
{
    private readonly IUserAchievementLikeService userAchievementLikeService;

    public UserAchievementLikeController(IUserAchievementLikeService userAchievementLikeService)
    {
        this.userAchievementLikeService = userAchievementLikeService;   
    }

    [HttpPost("adduserachievementlike")]
    public async Task<bool> AddUserAchievementLike(AddUserAchievementLike request)
    {
        return await userAchievementLikeService.AddUserAchievementLike(request);
    }

    [HttpGet("getachievementuserlikesfromuserid")]
    public async Task<List<UserAchievementDTO>> GetAchievementuserlkeFromUserId(Guid userId)
    {
        return await userAchievementLikeService.GetAchievementUserLikesFromUserId(userId);
    }

    [HttpDelete("removeuserachievementlike")]
    public async Task<bool> RemoveUserAchievementLike(RemoveUserAchievementLike request)
    {
        return await userAchievementLikeService.RemoveUserAchievementLike(request);
    }
}
