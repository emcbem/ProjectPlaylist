using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;
using PlaylistApp.Server.Services.UserGameServices;
using PlaylistApp.Server.Services.UserServices;

namespace PlaylistApp.Server.Controllers;
[ApiController]
[Route("[controller]")]
public class UserGameController : Controller
{
    private readonly IUserGameService userGameService;
    private readonly IUserService userService;

    public UserGameController(IUserGameService userGameService, IUserService userService)
    {
        this.userGameService = userGameService;
        this.userService = userService;
    }

    [Authorize]
    [HttpPost("addusergame")]
    public async Task<IResult> AddUserGame(AddUserGameRequest request)
    {
        var user = await userService.GetUserFromClaims(User);
        if (user.Guid != request.UserId)
        {
            return Results.Unauthorized();
        }

        return Results.Ok(await userGameService.AddUserGame(request));
    }

    [HttpGet("getusergamebyid")]
    public async Task<UserGameDTO> GetUserGameById(int userGameId)
    {
        return await userGameService.GetUserGameById(userGameId);
    }

    [HttpGet("getusergamebyuser")]
    public async Task<List<UserGameDTO>> GetUserGameByUser(Guid userId)
    {
        return await userGameService.GetUserGameByUser(userId);
    }

    [Authorize]
    [HttpDelete("deleteusergame")]
    public async Task<IResult> DeleteUserGame([FromQuery] int userGameId)
    {
        var user = await userService.GetUserFromClaims(User);
        var userGame = await GetUserGameById(userGameId);

        if (userGame?.User?.Id != user.Id)
        {
            return Results.Unauthorized();
        }
        return Results.Ok(await userGameService.RemoveUserGame(userGameId));
    }

    [Authorize]
    [HttpPatch("updateusergame")]
    public async Task<IResult> UpdateUserGame(UpdateUserGameRequest request)
    {
        var user = await userService.GetUserFromClaims(User);
        var userGame = await GetUserGameById(request.UserGameId);

        if (userGame?.User?.Id != user.Id)
        {
            return Results.Unauthorized();
        }

        return Results.Ok(await userGameService.UpdateUserGame(request));
    }
}
