using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.DTOs.CombinationData;
using PlaylistApp.Server.DTOs.PlaystationData;
using PlaylistApp.Server.Services.PlaystationServices;
using PsnApiWrapperNet.Model;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class PlaystationController : Controller
{
    private readonly PlaystationAuthenticationService PlaystationAuthService;
    private readonly PlaystationGameService PlaystationGameService;
    private readonly Services.PlaystationServices.NewPlaystationGamesGathererService PlaystationComparerService;
    private readonly IConfiguration config;

    public PlaystationController(PlaystationGameService playstationGameService, PlaystationAuthenticationService playstationAuthenticationService, IConfiguration configuration, Services.PlaystationServices.NewPlaystationGamesGathererService playstationComparerService)
    {
        PlaystationGameService = playstationGameService;
        PlaystationAuthService = playstationAuthenticationService;
        PlaystationComparerService = playstationComparerService;
        config = configuration;
    }

    [HttpPost("gettoken")]
    public async Task<PlaystationContext> GetPlaystationAuthenticationToken()
    {
        return await PlaystationAuthService.GetPlaystationAuthenticationToken();
    }

    [HttpPost("searchplayers")]
    public async Task<List<PlaystationUserDTO>> SearchPlaystationPlayers([FromBody] string username)
    {
        return await PlaystationGameService.SearchPlayer(username);
    }

    [HttpPost("getusersgamelist")]
    public async Task<List<PlaystationGameDTO>> GetPlaystationUsersGameList([FromBody] string accountId)
    {
        return await PlaystationGameService.GetUserPlaystationGameList(accountId);
    }

    [HttpPost("handleaddingplaystationgames")]
    public async Task<DTOs.PlaystationData.NewPlaystationGames> HandleBringingInNewPlaystationGames(PlaystationDTO playstationDTO)
    {
        return await PlaystationComparerService.HandleBringingInNewPlaystationGames(playstationDTO);
    }
}
