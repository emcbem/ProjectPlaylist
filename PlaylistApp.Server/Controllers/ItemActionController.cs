using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Services.UserGameServices;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class ItemActionController : Controller
{
    private readonly IUserGameService UserGameService;

    public ItemActionController(IUserGameService userGameService)
    {
        UserGameService = userGameService;
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

        await UserGameService.AddUserGame(addUserGameRequest);

        return Ok($"Successfully handled collision for {addUserGameRequest.PlatformGameId}");
    }
}
