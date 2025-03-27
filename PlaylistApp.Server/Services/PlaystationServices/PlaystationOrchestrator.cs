using PlaylistApp.Server.DTOs.CombinationData;
using PlaylistApp.Server.DTOs.PlaystationData;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Services.UserGameAuditLogServices;
using PlaylistApp.Server.Services.UserGameServices;
using System.Threading.Tasks;

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
    private readonly IUserGameAuditLogService UserGameAuditLogService;
    public PlaystationOrchestrator(PlaystationGameService playstationGameService,
                                   GatherNewPlaystationGamesService gatherNewPlaystationGamesService,
                                   AddNewPlaystationGamesService addNewPlaystationGamesService,
                                   HandlePlaystationPlatformErrorService handlePlaystationPlatformErrorService,
                                   SyncPlaystationService syncPlaystationService,
                                   PlaystationTrophyService playstationTrophyService,
                                   IUserGameService userGameService,
                                   IUserGameAuditLogService userGameAuditLogService)
    {
        PlaystationGameService = playstationGameService;
        GatherNewPlaystationGamesService = gatherNewPlaystationGamesService;
        AddNewPlaystationGamesService = addNewPlaystationGamesService;
        HandlePlaystationPlatformCollisionService = handlePlaystationPlatformErrorService;
        SyncPlaystationService = syncPlaystationService;
        PlaystationTrophyService = playstationTrophyService;
        UserGameService = userGameService;
        UserGameAuditLogService = userGameAuditLogService;
    }

    public async Task<List<ItemAction>> OrchestrateInitialAccountAdd(PlaystationDTO playstationDTO)
    {
        var itemActions = new List<ItemAction>();

        if (playstationDTO.AccountId is null)
        {
            return new List<ItemAction>();
        }

        var gameList = await PlaystationGameService.GetUserPlaystationGameList(playstationDTO.AccountId);

        var newPlaystationGames = await GatherNewPlaystationGamesService.HandleBringingInNewPlaystationGames(playstationDTO);

        await AddNewPlaystationGamesService.AddNewPlaystationGames(newPlaystationGames);

        itemActions =  await HandlePlaystationPlatformCollisionService.SendPlaystationPlatformErrorsToUser(newPlaystationGames);

        await OrchestratePlaystationHoursSyncing(playstationDTO);

        await PlaystationTrophyService.GetUserTotalEarnedPlaystationTrophies(playstationDTO);

        return itemActions;
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

        await OrcestratePlaystationAuditLog(playstationDTO, requests);

        await Task.WhenAll(updateTasks);
    }

    private async Task OrcestratePlaystationAuditLog(PlaystationDTO playstationDTO, List<Requests.UpdateRequests.UpdateUserGameRequest> requests)
    {
        var auditLogTasks = requests.Select(async request =>
        {
            try
            {
                var currentUserGame = await UserGameService.GetUserGameById(request.UserGameId);

                if (currentUserGame?.PlatformGame == null)  
                {
                    return;
                }

                var newAuditLog = new AddUserGameAuditLogRequest
                {
                    AuditDate = DateTime.UtcNow,  
                    MinutesAfter = request.TimePlayed,
                    UserId = playstationDTO.UserId,
                    MinutesBefore = currentUserGame.TimePlayed,
                    PlatformGameId = currentUserGame.PlatformGame.id
                };

                await UserGameAuditLogService.AddUserGameAuditLog(newAuditLog);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to add audit log: {ex.Message}");
            }
        });

        await Task.WhenAll(auditLogTasks);
    }

}
