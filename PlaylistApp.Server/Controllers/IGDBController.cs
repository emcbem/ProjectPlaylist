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

    [HttpGet]
    public async Task PostGames()
    {
        var jsonGames = await igdbService.GetGamesFromIGDB("fields *, age_ratings.*, cover.*, release_dates.*; limit 2;");
        
        await igdbService.PostGamesToDatabase(jsonGames);
    }
}
