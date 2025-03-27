using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;
using PlaylistApp.Server.Services.GameReviewService;
using PlaylistApp.Server.Services.UserServices;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class GameReviewController : Controller
{
    private readonly IGameReviewService gameReviewService;
    private readonly IUserService userService;

    public GameReviewController(IGameReviewService gameReviewService, IUserService userService)
    {
        this.gameReviewService = gameReviewService;
        this.userService = userService;
    }

    [Authorize]
    [HttpPost("addgamereview")]
    public async Task<IResult> AddGameReview(AddGameReviewRequest request)
    {
        var user = await userService.GetUserFromClaims(User);
        if(request.UserId != user.Id)
        {
            return Results.Unauthorized();
        }

        return Results.Ok<int>(await gameReviewService.AddGameReview(request));
    }

    [Authorize]
    [HttpDelete("deletegamereview")]
    public async Task<IResult> DeleteGameReview(int gameReviewId)
    {
        var user = await userService.GetUserFromClaims(User);
        var reviewToDelete = await GetGameReviewById(gameReviewId);

        if(reviewToDelete.User.Id != user.Id)
        {
            return Results.Unauthorized();
        }

        return Results.Ok(await gameReviewService.DeleteGameReview(gameReviewId));
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

    [Authorize]
    [HttpPatch("updategamereview")]
    public async Task<IResult> UpdateGameReview(UpdateGameReviewRequest request)
    {
        var user = await userService.GetUserFromClaims(User);
        var reviewToDelete = await GetGameReviewById(request.GameReviewId);

        if (reviewToDelete.User.Id != user.Id)
        {
            return Results.Unauthorized();
        }

        return Results.Ok(await gameReviewService.UpdateGameReview(request));
    }
}
