using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.Services.IGDBServices.Game;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class IGDBGameController : Controller
{
    private readonly IIGDBGameService igdbService;

    public IGDBGameController(IIGDBGameService igdbService)
    {
        this.igdbService = igdbService;
    }

    [HttpGet("AddMostRecent500Games")]
    public async Task PostGames()
    {
        //var jsonGames = await igdbService.GetGamesFromIGDB("fields *, age_ratings.*, cover.*, release_dates.*; limit 500; where rating > 80;");

        //await igdbService.PostGamesToDatabase(jsonGames);
    }
}
