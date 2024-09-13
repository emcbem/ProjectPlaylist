using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Services.Game;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class GameController : Controller
{
    private readonly IGameService gameService;

    public GameController(IGameService gameService)
    {
        this.gameService = gameService;
    }
    [HttpGet("getall")]
    public async Task<List<GameDTO>> GetAllGames()
    {
        return await gameService.GetAllGames(); 
    }
}
