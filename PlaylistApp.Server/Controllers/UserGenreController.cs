using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.DeleteRequests;
using PlaylistApp.Server.Services.UserGenreService;

namespace PlaylistApp.Server.Controllers;
[ApiController]
[Route("[controller]")]
public class UserGenreController : Controller
{
    private readonly IUserGenreService userGenreService;

    public UserGenreController(IUserGenreService userGenreService)
    {
        this.userGenreService = userGenreService;
    }

    [HttpPost("addusergenre")]
    public async Task<bool> AddUserGenre(AddUserGenreRequest request)
    {
        return await userGenreService.AddUserGenre(request);
    }

    [HttpDelete("deleteusergenre")]
    public async Task<bool> DeleteUserGenre(RemoveUserGenreRequest request)
    {
        return await userGenreService.DeleteUserGenre(request);
    }

    [HttpGet("getallbyuser")]
    public async Task<List<GenreDTO>> GetAllByUser(Guid userId)
    {
        return await userGenreService.GetAllByUser(userId);
    }
}
