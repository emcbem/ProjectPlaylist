using Microsoft.AspNetCore.Mvc;
using MimeKit.Encodings;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.GetRequests;
using PlaylistApp.Server.Requests.UpdateRequests;
using PlaylistApp.Server.Services.SteamServices.SteamAchievementService;
using PlaylistApp.Server.Services.UserGameServices;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class ItemActionController : Controller
{
    private readonly IUserGameService UserGameService;
    private readonly ISteamAchievementService SteamAchievementService;

    public ItemActionController(IUserGameService userGameService, ISteamAchievementService steamAchievementService)
    {
        UserGameService = userGameService;
        SteamAchievementService = steamAchievementService;
    }

    [HttpGet("/action/platforms")]
    public async Task<IActionResult> ResolvePlatformCollision([FromQuery] int hours, [FromQuery] int pgid, [FromQuery] string user)
    {
        if (!Guid.TryParse(user, out Guid userId))
        {
            return BadRequest("Invalid user ID format.");
        }

        AddUserGameRequest addUserGameRequest = new AddUserGameRequest
        {
            HoursPlayed = hours,
            PlatformGameId = pgid,
            UserId = userId
        };

        var newUserGameId = await UserGameService.AddUserGame(addUserGameRequest);


        var gameJustMade = await UserGameService.GetUserGameById(newUserGameId);
        
        if(gameJustMade is null || gameJustMade.PlatformGame is null)
        {
            throw new Exception("Failed adding user platform game");
        }

        var platformIdOfGameJustMade = gameJustMade.PlatformGame.PlatformKey;

        if (gameJustMade.PlatformGame.Platform.Id == 6 || gameJustMade.PlatformGame.Platform.Id == 163)  // this feels so stinky. sooo so stinky
        {
            SteamAchievementService.AddMissingActionsAfterResolvingGameCollision(new List<string>() { platformIdOfGameJustMade.ToString() }, userId);
        }

        return Ok($"Successfully handled collision for {addUserGameRequest.PlatformGameId}");
    }

    [HttpGet("/action/hours")]
    public async Task<IActionResult> ResolveHoursCollision([FromQuery] int hours, [FromQuery] int pgid, [FromQuery] string user)
    {
        if (!Guid.TryParse(user, out Guid userId))
        {
            return BadRequest("Invalid user ID format.");
        }

        var getUserGameRequest = new GetUserGameRequest
        {
            PlatformGameId = pgid,
            UserId = userId
        };

        var possibleGame = await UserGameService.GetUserGameByPlatformGameAndUser(getUserGameRequest);

        UpdateUserGameRequest updateUserGameRequest = new UpdateUserGameRequest
        {
            DateAdded = DateTime.UtcNow,
            TimePlayed = hours,
            UserGameId = possibleGame.UserGameId,
        };

        await UserGameService.UpdateUserGame(updateUserGameRequest);

        return Ok($"Successfully updated game to found state");
    }
}
