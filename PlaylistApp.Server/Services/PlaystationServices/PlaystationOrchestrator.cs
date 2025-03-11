using PlaylistApp.Server.DTOs.CombinationData;
using PlaylistApp.Server.DTOs.PlaystationData;

namespace PlaylistApp.Server.Services.PlaystationServices;

public class PlaystationOrchestrator
{
    private readonly PlaystationGameService PlaystationGameService;
    private readonly GatherNewPlaystationGamesService GatherNewPlaystationGamesService;
    private readonly AddNewPlaystationGamesService AddNewPlaystationGamesService;
    private readonly HandlePlaystationPlatformErrorService HandlePlaystationPlatformCollisionService;
    private readonly SyncPlaystationService SyncPlaystationService;
    private readonly PlaystationTrophyService PlaystationTrophyService;
    public PlaystationOrchestrator(PlaystationGameService playstationGameService,
                                   GatherNewPlaystationGamesService gatherNewPlaystationGamesService,
                                   AddNewPlaystationGamesService addNewPlaystationGamesService,
                                   HandlePlaystationPlatformErrorService handlePlaystationPlatformErrorService,
                                   SyncPlaystationService syncPlaystationService,
                                   PlaystationTrophyService playstationTrophyService)
    {
        PlaystationGameService = playstationGameService;
        GatherNewPlaystationGamesService = gatherNewPlaystationGamesService;
        AddNewPlaystationGamesService = addNewPlaystationGamesService;
        HandlePlaystationPlatformCollisionService = handlePlaystationPlatformErrorService;
        SyncPlaystationService = syncPlaystationService;
        PlaystationTrophyService = playstationTrophyService;
    }

    public async Task<List<ItemAction>> OrchestrateInitialAccountAdd(PlaystationDTO playstationDTO)
    {
        var ItemActions = new List<ItemAction>();

        if (playstationDTO.AccountId is null)
        {
            return new List<ItemAction>();
        }

        var gameList = await PlaystationGameService.GetUserPlaystationGameList(playstationDTO.AccountId);

        var newPlaystationGames = await GatherNewPlaystationGamesService.HandleBringingInNewPlaystationGames(playstationDTO);

        var newGamesSent = await AddNewPlaystationGamesService.AddNewPlaystationGames(newPlaystationGames);

        ItemActions =  await HandlePlaystationPlatformCollisionService.SendPlaystationPlatformErrorsToUser(newPlaystationGames);

        var hoursActions = await OrchestratePlaystationHoursSyncing(playstationDTO);

        foreach (var action in hoursActions)
        {
            ItemActions.Add(action);
        }

        await PlaystationTrophyService.GetUserTotalEarnedPlaystationTrophies(playstationDTO);

        return ItemActions;
    }

    public async Task<List<ItemAction>> OrchestratePlaystationHoursSyncing(PlaystationDTO playstationDTO)
    {
        if (playstationDTO.AccountId is null)
        {
            return new List<ItemAction>();
        }

        return await SyncPlaystationService.CompareGames(playstationDTO);
    }
}
