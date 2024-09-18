using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.Services.IGDBServices.Genre;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class IGDBGenreController : Controller
{
    private readonly IIGDBGenreService igdbService;

    public IGDBGenreController(IIGDBGenreService igdbService)
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
