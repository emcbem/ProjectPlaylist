using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.Services.IGDBServices;

namespace PlaylistApp.Server.Controllers;

#if DEBUG

[ApiController]
[Route("[controller]")]
public class IGDBGameController : Controller
{
    private readonly IGDBGameService igdbService;

    public IGDBGameController(IGDBGameService igdbService)
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

#endif
