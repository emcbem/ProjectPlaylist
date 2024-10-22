using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;
using PlaylistApp.Server.Services.GameReviewService;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class GameReviewController : Controller
{
    private readonly IGameReviewService gameReviewService;

    public GameReviewController(IGameReviewService gameReviewService)
    {
        this.gameReviewService = gameReviewService;
    }

    [HttpPost("addgamereview")]
    public async Task<int> AddGameReview(AddGameReviewRequest request)
    {
        return await gameReviewService.AddGameReview(request);
    }

    [HttpDelete("deletegamereview")]
    public async Task<bool> DeleteGameReview(int gameReviewId)
    {
        return await gameReviewService.DeleteGameReview(gameReviewId);
    }

    [HttpGet("getallgamereviewsbygame")]
    public async Task<List<GameReviewDTO>> GetAllGameReviewByGame(int gameId)
    {
        return await gameReviewService.GetAllGameReivewByGame(gameId);
    }

    [HttpGet("getgamereviewbyid")]
    public async Task<GameReviewDTO> GetGameReviewById(int gameReviewId)
    {
        return await gameReviewService.GetGameReviewById(gameReviewId);
    }

    [HttpPatch("updategamereview")]
    public async Task<GameReviewDTO> UpdateGameReview(UpdateGameReviewRequest request)
    {
        return await gameReviewService.UpdateGameReview(request);
    }
}
