﻿using PlaylistApp.Server.DTOs.CombinationData;
using PlaylistApp.Server.DTOs.PlaystationData;
using PlaylistApp.Server.Requests.UpdateRequests;
using PlaylistApp.Server.Services.UserGameServices;

namespace PlaylistApp.Server.Services.PlaystationServices;

public class PlaystationOrchestrator
{
    private readonly PlaystationGameService PlaystationGameService;
    private readonly GatherNewPlaystationGamesService GatherNewPlaystationGamesService;
    private readonly AddNewPlaystationGamesService AddNewPlaystationGamesService;
    private readonly HandlePlaystationPlatformErrorService HandlePlaystationPlatformCollisionService;
    private readonly SyncPlaystationService SyncPlaystationService;
    private readonly PlaystationTrophyService PlaystationTrophyService;
    private readonly IUserGameService UserGameService;
    public PlaystationOrchestrator(PlaystationGameService playstationGameService,
                                   GatherNewPlaystationGamesService gatherNewPlaystationGamesService,
                                   AddNewPlaystationGamesService addNewPlaystationGamesService,
                                   HandlePlaystationPlatformErrorService handlePlaystationPlatformErrorService,
                                   SyncPlaystationService syncPlaystationService,
                                   PlaystationTrophyService playstationTrophyService,
                                   IUserGameService userGameService)
    {
        PlaystationGameService = playstationGameService;
        GatherNewPlaystationGamesService = gatherNewPlaystationGamesService;
        AddNewPlaystationGamesService = addNewPlaystationGamesService;
        HandlePlaystationPlatformCollisionService = handlePlaystationPlatformErrorService;
        SyncPlaystationService = syncPlaystationService;
        PlaystationTrophyService = playstationTrophyService;
        UserGameService = userGameService;
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

        await AddNewPlaystationGamesService.AddNewPlaystationGames(newPlaystationGames);

        ItemActions =  await HandlePlaystationPlatformCollisionService.SendPlaystationPlatformErrorsToUser(newPlaystationGames);

        await OrchestratePlaystationHoursSyncing(playstationDTO);

        await PlaystationTrophyService.GetUserTotalEarnedPlaystationTrophies(playstationDTO);

        return ItemActions;
    }

    public async Task OrchestratePlaystationHoursSyncing(PlaystationDTO playstationDTO)
    {
        if (playstationDTO.AccountId is null)
        {
            return;
        }

        var requests = await SyncPlaystationService.CompareGames(playstationDTO);

        var updateTasks = requests.Select(async request =>
        {
            try
            {
                await UserGameService.UpdateUserGame(request);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to update game: {ex.Message}");
            }
        });

        await Task.WhenAll(updateTasks);
    }
}
