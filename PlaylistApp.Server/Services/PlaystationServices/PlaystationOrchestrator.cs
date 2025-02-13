using PlaylistApp.Server.DTOs.CombinationData;
using PlaylistApp.Server.DTOs.PlaystationData;

namespace PlaylistApp.Server.Services.PlaystationServices;

public class PlaystationOrchestrator
{
    private readonly PlaystationGameService PlaystationGameService;
    private readonly GatherNewPlaystationGamesService GatherNewPlaystationGamesService;
    private readonly AddNewPlaystationGamesService AddNewPlaystationGamesService;
    private readonly HandlePlaystationPlatformErrorService HandlePlaystationPlatformErrorService;
    private readonly SyncPlaystationService SyncPlaystationService;
    public PlaystationOrchestrator(PlaystationGameService playstationGameService,
                                   GatherNewPlaystationGamesService gatherNewPlaystationGamesService,
                                   AddNewPlaystationGamesService addNewPlaystationGamesService,
                                   HandlePlaystationPlatformErrorService handlePlaystationPlatformErrorService,
                                   SyncPlaystationService syncPlaystationService)
    {
        PlaystationGameService = playstationGameService;
        GatherNewPlaystationGamesService = gatherNewPlaystationGamesService;
        AddNewPlaystationGamesService = addNewPlaystationGamesService;
        HandlePlaystationPlatformErrorService = handlePlaystationPlatformErrorService;
        SyncPlaystationService = syncPlaystationService;
    }

    public async Task<ItemAction> OrchestrateInitialAccountAdd(PlaystationDTO playstationDTO)
    {
        var ItemAction = new ItemAction();

        if (playstationDTO.AccountId is null)
        {
            return new ItemAction();
        }

        var gameList = await PlaystationGameService.GetUserPlaystationGameList(playstationDTO.AccountId);

        var newPlaystationGames = await GatherNewPlaystationGamesService.HandleBringingInNewPlaystationGames(playstationDTO);

        var newGamesSent = await AddNewPlaystationGamesService.AddNewPlaystationGames(newPlaystationGames);

        ItemAction =  await HandlePlaystationPlatformErrorService.SendPlaystationPlatformErrorsToUser(newPlaystationGames);

        var hoursAction = await OrchestrateSyncPlaystationGames(playstationDTO);

        foreach (var option in hoursAction)
        {
            ItemAction.ItemOptions.Add(option);
        }

        return ItemAction;
    }

    public async Task<List<ItemOption>> OrchestrateSyncPlaystationGames(PlaystationDTO playstationDTO)
    {
        if (playstationDTO.AccountId is null)
        {
            return new List<ItemOption>();
        }

        return await SyncPlaystationService.CompareGames(playstationDTO);
    }
}
