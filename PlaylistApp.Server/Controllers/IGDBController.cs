using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.Services.IGDBServices;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class IGDBController : Controller
{
    private readonly IIGDBService igdbService;

    public IGDBController(IIGDBService igdbService)
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
