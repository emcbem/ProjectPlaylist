using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.DTOs.CombinationData;
using PlaylistApp.Server.DTOs.PlaystationData;
using PlaylistApp.Server.Services.PlaystationServices;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class PlaystationController : Controller
{
    private readonly PlaystationAuthenticationService PlaystationAuthService;
    private readonly PlaystationGameService PlaystationGameService;
    private readonly GatherNewPlaystationGamesService PlaystationComparerService;
    private readonly AddNewPlaystationGamesService AddNewPlaystationGamesService;
    private readonly PlaystationOrchestrator PlaystationOrchestrator;
    private readonly HandlePlaystationPlatformErrorService HandlePlaystationPlatformErrorService;

    public PlaystationController(PlaystationOrchestrator playstationOrchestrator,
                                 AddNewPlaystationGamesService addNewPlaystationGamesService,
                                 PlaystationGameService playstationGameService,
                                 PlaystationAuthenticationService playstationAuthenticationService,
                                 IConfiguration configuration,
                                 GatherNewPlaystationGamesService playstationComparerService,
                                 HandlePlaystationPlatformErrorService handlePlaystationPlatformErrorService)
    {
        PlaystationGameService = playstationGameService;
        PlaystationAuthService = playstationAuthenticationService;
        PlaystationComparerService = playstationComparerService;
        AddNewPlaystationGamesService = addNewPlaystationGamesService;
        PlaystationOrchestrator = playstationOrchestrator;
        HandlePlaystationPlatformErrorService = handlePlaystationPlatformErrorService;
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

    [HttpPost("orchestrator")]
    public async Task<ItemAction> SyncPlaystationData(PlaystationDTO playstationDTO)
    {
        return await PlaystationOrchestrator.OrchestrateInitialAccountAdd(playstationDTO);
    }

    [HttpPost("sync")]
    public async Task<ItemAction> SyncPlaystationHours(PlaystationDTO playstationDTO)
    {
        return await PlaystationOrchestrator.OrchestrateSyncPlaystationGames(playstationDTO);
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

    [HttpPost("playstationplatformerror")]
    public async Task<ItemAction> SendPlaystationPlatformErrorsToUser(NewPlaystationGames newPlaystationGames)
    {
        return await HandlePlaystationPlatformErrorService.SendPlaystationPlatformErrorsToUser(newPlaystationGames);
    }
}
