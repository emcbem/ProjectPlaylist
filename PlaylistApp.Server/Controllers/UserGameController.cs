using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;
using PlaylistApp.Server.Services.UserGameServices;

namespace PlaylistApp.Server.Controllers;
[ApiController]
[Route("[controller]")]
public class UserGameController : Controller
{
    private readonly IUserGameService userGameService;

    public UserGameController(IUserGameService userGameService)
    {
        this.userGameService = userGameService;
    }

    [Authorize]
    [HttpPost("addusergame")]
    public async Task<int> AddUserGame(AddUserGameRequest request)
    {
        return await userGameService.AddUserGame(request);
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
    public async Task<bool> DeleteUserGame([FromQuery] int userGameId)
    {
        return await userGameService.RemoveUserGame(userGameId);
    }

    [Authorize]
    [HttpPatch("updateusergame")]
    public async Task<UserGameDTO> UpdateUserGame(UpdateUserGameRequest request)
    {
        return await userGameService.UpdateUserGame(request);
    }
}
