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
    private readonly IConfiguration config;

    public PlaystationController(PlaystationAuthenticationService playstationAuthenticationService, IConfiguration configuration)
    {
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
        return await playstationService.SearchPlayer(username);
    }
}
