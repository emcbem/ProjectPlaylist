using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.GetRequests;
using PlaylistApp.Server.Requests.UpdateRequests;
using PlaylistApp.Server.Services.ItemActionService;
using PlaylistApp.Server.Services.UserGameServices;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class ItemActionController : Controller
{
    private readonly IUserGameService UserGameService;
    private readonly IItemActionService ItemActionService;


    public ItemActionController(IUserGameService userGameService, IItemActionService itemActionService)
    {
        UserGameService = userGameService;
        ItemActionService = itemActionService;
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

        await ItemActionService.ResolveDifferencesInAchievements(newUserGameId, userId);
        
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
