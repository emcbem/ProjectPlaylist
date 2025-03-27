using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Asn1.Ocsp;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;
using PlaylistApp.Server.Services.UserPlatformServices;
using PlaylistApp.Server.Services.UserServices;

namespace PlaylistApp.Server.Controllers;
[ApiController]
[Route("[controller]")]
public class UserPlatformController : Controller
{
    private readonly IUserPlatformService userPlatformService;
    private readonly IUserService userService;

    public UserPlatformController(IUserPlatformService userPlatformService, IUserService userService)
    {
        this.userPlatformService = userPlatformService;
        this.userService = userService;
    }

    [Authorize]
    [HttpPost("adduserplatform")]
    public async Task<IResult> AddUserPlatform(AddUserPlatformRequest request)
    {
        var user = await userService.GetUserFromClaims(User);
        if(user.Guid != request.UserId)
        {
            return Results.Unauthorized();
        }

        return Results.Ok(await userPlatformService.AddUserPlatform(request));
    }

    [Authorize]
    [HttpDelete("deleteuserplatform")]
    public async Task<IResult> DeleteUserPlatform(int userPlatformId)
    {
        var user = await userService.GetUserFromClaims(User);
        var userPlatform = await userPlatformService.GetUserPlatfromById(userPlatformId);

        if (user.Id != userPlatform?.UserId)
        {
            return Results.Unauthorized();
        }

        return Results.Ok(await userPlatformService.DeleteUserPlatform(userPlatformId));
    }

    [HttpGet("getallbyuser")]
    public async Task<List<UserPlatformDTO>> GetAllByUser(Guid userId)
    {
        return await userPlatformService.GetAllByUser(userId);
    }

    [Authorize]
    [HttpPatch("updateuserplatform")]
    public async Task<IResult> UpdateUserPlatform(UpdateUserPlatformRequest request)
    {
        var user = await userService.GetUserFromClaims(User);
        var userPlatform = await userPlatformService.GetUserPlatfromById(request.Id);

        if (user.Id != userPlatform?.UserId)
        {
            return Results.Unauthorized();
        }
        return Results.Ok(await userPlatformService.UpdateUserPlatform(request));
    }
}
