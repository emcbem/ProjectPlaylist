using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.GetRequests;
using PlaylistApp.Server.Services.PlatformGameServices;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class PlatformGameController : Controller
{
    private readonly IPlatformGameService platformGameService;

    public PlatformGameController(IPlatformGameService platformGameService)
    {
        this.platformGameService = platformGameService;
    }

    [HttpPost("getallplatformgames")]
    public async Task<List<PlatformGameDTO>> GetAllPlatformGame(PlatformGameRequest request)
    {
        return await platformGameService.GetAllPlatformGames(request);
    }

    [HttpGet("getallplatformgamesbygame")]
    public async Task<List<PlatformGameDTO>> GetAllPlatformGamesByGame(int gameId)
    {
        return await platformGameService.GetAllPlatformGamesByGame(gameId);
    }

    [HttpGet("getallplatformgamesbyexternalkey")]
    public async Task<List<PlatformGameDTO>> GetAllPlatformGAmesByExternalKey(string platformkey)
    {
        return await platformGameService.GetAllPlatformGamesByExternalKey(platformkey);
    }
}
