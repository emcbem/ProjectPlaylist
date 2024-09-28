using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Services.GenreServices;

namespace PlaylistApp.Server.Controllers;
[ApiController]
[Route("[controller]")]
public class GenreController : Controller
{
    private readonly IGenreService genreService;

    public GenreController(IGenreService genreService)
    {
        this.genreService = genreService;
    }

    [HttpGet("getallgenres")]
    public async Task<List<GenreDTO>> GetAll()
    {
        return await genreService.GetAllGenres(); 
    }

    [HttpGet("getgenrebyid")]
    public async Task<GenreDTO> GetGenreById(int genreId)
    {
        return await genreService.GetGenreById(genreId);
    }

    [HttpGet("getgenrebyname")]
    public async Task<GenreDTO> GetGenreByName(string genreName)
    {
        return await genreService.GetGenreByName(genreName);
    }
}
