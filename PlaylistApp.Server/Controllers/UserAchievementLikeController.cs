using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.DeleteRequests;
using PlaylistApp.Server.Requests.GetRequests;
using PlaylistApp.Server.Requests.UpdateRequests;
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

    [HttpPost("removeuserachievementlike")]
    public async Task<bool> RemoveUserAchievementLike(RemoveUserAchievementLikeRequest request)
    {
        return await userAchievementLikeService.RemoveUserAchievementLike(request);
    }

    [HttpPatch("updateuserachievementlike")]
    public async Task<bool> UpdateUserAchievementLike(UpdateUserAchievementLikeRequest request)
    {
        return await userAchievementLikeService.UpdateUserAchievementLike(request);
    }

    [HttpPost("getuserachievementlike")]
    public async Task<UserAchievementLikeDTO> GetUserAchievementLike(GetUserAchievementLikeRequest request)
    {
        return await userAchievementLikeService.GetUserAchievementLike(request);
    }
}
