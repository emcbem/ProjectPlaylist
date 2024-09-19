using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.Services.IGDBServices;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class IGDBGenreController : Controller
{
    private readonly IGDBGenreService igdbService;

    public IGDBGenreController(IGDBGenreService igdbService)
    {
        this.igdbService = igdbService;
    }

    [HttpGet("AddAllGenresIntoDatabase")]
    public async Task PostGames()
    {
        //var jsonGames = await igdbService.GetGenresFromIGDB("fields *; limit 500;");

        //await igdbService.PostGenresToDatabase(jsonGames);
    }
}
