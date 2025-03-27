using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MimeKit.Encodings;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.GetRequests;
using PlaylistApp.Server.Requests.UpdateRequests;
using PlaylistApp.Server.Services.SteamServices.SteamAchievementService;
using PlaylistApp.Server.Services.UserGameServices;
using PlaylistApp.Server.Services.UserPlatformServices;
using PlaylistApp.Server.Services.UserServices;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class ItemActionController : Controller
{
    private readonly IUserGameService UserGameService;
    private readonly ISteamAchievementService SteamAchievementService;
    private readonly IUserPlatformService UserPlatformService;


    public ItemActionController(IUserGameService userGameService, ISteamAchievementService steamAchievementService, IUserPlatformService userPlatformService)
    {
        UserGameService = userGameService;
        SteamAchievementService = steamAchievementService;
        UserPlatformService = userPlatformService;
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

        var usersPlatforms = await UserPlatformService.GetAllByUser(userId);

        string userExternalPlatformId = string.Empty;
        foreach (var up in usersPlatforms)
        {
            if (up.PlatformId == 6 || up.PlatformId == 163)
            {
                userExternalPlatformId = up.ExternalPlatformId;
            }
        }
        //var userPlatform = user2.Where(x => x.PlatformId == 6).First();
        

        if ((gameJustMade.PlatformGame.Platform.Id == 6 || gameJustMade.PlatformGame.Platform.Id == 163) && !userExternalPlatformId.IsNullOrEmpty())  // this feels so stinky. sooo so stinky
        {
            await SteamAchievementService.AddMissingAchievementsToUser(userId, userExternalPlatformId);
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
