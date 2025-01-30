using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.DTOs.PlaystationData;
using PlaylistApp.Server.Services.PlaystationServices;
using PsnApiWrapperNet.Model;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class PlaystationController : Controller
{
    private readonly PlaystationAuthenticationService playstationService;
    private readonly PlaystationGameService playstationGameService;
    private readonly IConfiguration config;

    public PlaystationController(PlaystationGameService playstationGameService, PlaystationAuthenticationService playstationAuthenticationService, IConfiguration configuration)
    {
        this.playstationGameService = playstationGameService;
        playstationService = playstationAuthenticationService;
        config = configuration;
    }

    [HttpPost("gettoken")]
    public async Task<PlaystationContext> GetPlaystationAuthenticationToken()
    {
        return await playstationService.GetPlaystationAuthenticationToken();
    }

    [HttpPost("searchplayers")]
    public async Task<List<PlaystationUserDTO>> SearchPlaystationPlayers([FromBody] string username)
    {
        return await playstationGameService.SearchPlayer(username);
    }

    [HttpPost("getusersgamelist")]
    public async Task<GameList> GetPlaystationUsersGameList([FromBody] string accountId)
    {
        return await playstationGameService.GetUserPlaystationGameList(accountId);
    }
}
