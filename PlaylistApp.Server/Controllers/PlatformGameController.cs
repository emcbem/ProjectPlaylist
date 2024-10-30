﻿using Microsoft.AspNetCore.Mvc;
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

    [HttpGet("getplatformgamebyid/{platformGameId}")]
    public async Task<PlatformGameDTO> GetPlatformGameById(int platformGameId)
    {
        return await platformGameService.GetPlatformGamesById(platformGameId);
    }
}
