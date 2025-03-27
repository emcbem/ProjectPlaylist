using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Asn1.Ocsp;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.GetRequests;
using PlaylistApp.Server.Requests.UpdateRequests;
using PlaylistApp.Server.Services.UserAchievementServices;
using PlaylistApp.Server.Services.UserServices;

namespace PlaylistApp.Server.Controllers;
[ApiController]
[Route("[controller]")]
public class UserAchievementController : Controller
{
    private readonly IUserAchievementService userAchievementService;
    private readonly IUserService userService;

    public UserAchievementController(IUserAchievementService userAchievementService, IUserService userService)
    {
        this.userAchievementService = userAchievementService;
        this.userService = userService;
    }

    [Authorize]
    [HttpPost("adduserachievement")]
    public async Task<IResult> AddUserAchievement(AddUserAchievementRequest request)
    {
        var user = await userService.GetUserFromClaims(User);
        if(user.Guid != request.UserGuid)
        {
            return Results.Unauthorized();
        }

        return Results.Ok(await userAchievementService.AddUserAchievement(request));
    }

    [Authorize]
    [HttpDelete("deleteuserachievement")]
    public async Task<IResult> DeleteUserAchievement(int id)
    {
        var user = await userService.GetUserFromClaims(User);
        var achievement = await GetUserAchievementById(id);

        if (user.Id != achievement?.User?.Id)
        {
            return Results.Unauthorized();
        }

        return Results.Ok(await userAchievementService.DeleteUserAchievement(id));
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

    [Authorize]
    [HttpPatch("updateuserachievement")]
    public async Task<IResult> UpdateuserAchievement(UpdateUserAchievementRequest request)
    {
        var user = await userService.GetUserFromClaims(User);
        var achievement = await GetUserAchievementById(request.Id);

        if (user.Id != achievement?.User?.Id)
        {
            return Results.Unauthorized();
        }


        return Results.Ok(await userAchievementService.UpdateUserAchievement(request));
    }

    [HttpPost("getachievementsfromgamefromuser")]
    public async Task<List<AchievementDTO>> GetAchievementFromGameFromUser(GetClaimedAchievementsForGameForUserRequest request)
    {
        return await userAchievementService.GetClaimedAchievementsForGameForUser(request);
    }
}
