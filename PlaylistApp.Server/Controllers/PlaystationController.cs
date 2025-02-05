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
    private readonly GatherNewPlaystationGamesService PlaystationComparerService;
    private readonly AddNewPlaystationGamesService AddNewPlaystationGamesService;
    private readonly IConfiguration config;

    public PlaystationController(AddNewPlaystationGamesService addNewPlaystationGamesService, PlaystationGameService playstationGameService, PlaystationAuthenticationService playstationAuthenticationService, IConfiguration configuration, Services.PlaystationServices.GatherNewPlaystationGamesService playstationComparerService)
    {
        PlaystationGameService = playstationGameService;
        PlaystationAuthService = playstationAuthenticationService;
        PlaystationComparerService = playstationComparerService;
        AddNewPlaystationGamesService = addNewPlaystationGamesService;
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
    public async Task<NewPlaystationGames> HandleBringingInNewPlaystationGames(PlaystationDTO playstationDTO)
    {
        return await PlaystationComparerService.HandleBringingInNewPlaystationGames(playstationDTO);
    }

    [HttpPost("addnewplaystationgames")]
    public async Task<bool> AddNewPlaystationGames(NewPlaystationGames newPlaystationGames)
    {
        return await AddNewPlaystationGamesService.AddNewPlaystationGames(newPlaystationGames);
    }
}
