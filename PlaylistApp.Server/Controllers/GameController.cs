using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.GetRequests;
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

    [HttpGet("getallbycompany")]
    public async Task<List<GameDTO>> GetAllGamesByCompany(int companyId)
    {
        return await gameService.GetAllGamesByCompany(companyId);
    }

    [HttpGet("getgamebyid")]
    public async Task<GameDTO> GetGameById(int gameId)
    {
        return await gameService.GetGameByID(gameId);
    }

    [HttpGet("getgamebyigdb")]
    public async Task<GameDTO> GetGameByIGDB(int gameId)
    {
        return await gameService.GetGameByIGDB(gameId);
    }

    [HttpGet("getgamebyname")]
    public async Task<List<GameDTO>> GetGamesByName(string gameName)
    {
        return await gameService.GetGameByName(gameName);
    }

    [HttpPost("filtergamesbyrequest")]
    public async Task<List<GameDTO>> FilterGamesByRequest(GetGamesRequest request)
    {
        return await gameService.GetGamesByFilter(request);
    }
}
