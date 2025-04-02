using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.DTOs.WrapUpData;
using PlaylistApp.Server.Requests.GetRequests;
using PlaylistApp.Server.Services.Game;
using PlaylistApp.Server.Services.PlatformGameServices;
using PlaylistApp.Server.Services.UserGameAuditLogServices;

namespace PlaylistApp.Server.Services.WrapUpServices;

public class WrapUpService : IWrapUpService
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;
    private readonly IUserGameAuditLogService userGameAuditLogService;
    private readonly IGameService gameService;
    private readonly IPlatformGameService platformGameService;
    public WrapUpService(IDbContextFactory<PlaylistDbContext> dbContextFactory, IUserGameAuditLogService userGameAuditLogService, IGameService gameService, IPlatformGameService platformGameService)
    {
        this.dbContextFactory = dbContextFactory;
        this.userGameAuditLogService = userGameAuditLogService;
        this.gameService = gameService;
        this.platformGameService = platformGameService;
    }
    public async Task<List<WrapUpCarouselGameDTO>> ConvertUserGameAuditLogsToCarouselGame(GetWrapUpRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.UserId) || !Guid.TryParse(request.UserId, out var userGuid))
        {
            return new List<WrapUpCarouselGameDTO>();
        }

        var context = await dbContextFactory.CreateDbContextAsync();

        var getUserGameAuditLogsRequest = new GetAuditLogByDateRequest
        {
            UserGuid = userGuid,
            Month = request.Month,
            Year = request.Year
        };

        var games = await userGameAuditLogService.GetUserGamesFromUserGameAuditLogDate(getUserGameAuditLogsRequest);

        if (games == null || !games.Any())
        {
            return new List<WrapUpCarouselGameDTO>();
        }

        return GatherCarouselGames(games);
    }

    public async Task<List<WrapUpHourBarGraphDTO>> GatherBarGraphData(GetWrapUpRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.UserId) || !Guid.TryParse(request.UserId, out var userGuid))
        {
            return new List<WrapUpHourBarGraphDTO>();
        }

        var context = await dbContextFactory.CreateDbContextAsync();

        var allUserGameAuditLogs = await context.UserGameAuditLogs
            .Include(x => x.PlatformGame)
                .ThenInclude(x => x.Game)
            .Where(x => x.UserAccount.Guid == userGuid &&
                        x.AuditDate.Year == request.Year &&
                        (request.Month == -1 || x.AuditDate.Month == request.Month))
            .OrderBy(x => x.AuditDate) 
            .ToListAsync();

        var platformGameIdToAuditData = new Dictionary<int, (long? MinutesBefore, long? MinutesAfter)>();

        foreach (var auditLog in allUserGameAuditLogs)
        {
            if (!platformGameIdToAuditData.ContainsKey(auditLog.PlatformGameId))
            {
                platformGameIdToAuditData[auditLog.PlatformGameId] = (auditLog.MinutesBefore, auditLog.MinutesAfter);
            }
            else
            {
                var (firstMinutesBefore, _) = platformGameIdToAuditData[auditLog.PlatformGameId];
                platformGameIdToAuditData[auditLog.PlatformGameId] = (firstMinutesBefore, auditLog.MinutesAfter);
            }
        }

        var wrapUpHourBarGraphDTOs = new List<WrapUpHourBarGraphDTO>();

        foreach (var kvp in platformGameIdToAuditData)
        {
            var platformGameId = kvp.Key;
            var (minutesBefore, minutesAfter) = kvp.Value;
            var currentGame = await platformGameService.GetPlatformGameById(platformGameId);

            var minutesChange = (minutesAfter ?? 0) - (minutesBefore ?? 0);

            wrapUpHourBarGraphDTOs.Add(new WrapUpHourBarGraphDTO
            {
                GameTitle = currentGame.Game.Title,
                TimePlayed = minutesChange
            });
        }

        return wrapUpHourBarGraphDTOs;
    }


    public async Task<WrapUpDTO> OrchestrateWrapUpGathering(GetWrapUpRequest request)
    {
        if (request is null)
        {
            return new WrapUpDTO();
        }

        var carouselGames = await ConvertUserGameAuditLogsToCarouselGame(request);

        var hourBarGraphDTOs = await GatherBarGraphData(request);


        var newWrapUpDTO = new WrapUpDTO()
        {
            GamesPlayed = carouselGames,
            BarGraphGameData = hourBarGraphDTOs
        };

        return newWrapUpDTO;
    }

    private List<WrapUpCarouselGameDTO> GatherCarouselGames(List<GameDTO> games)
    {
        var carouselGames = new List<WrapUpCarouselGameDTO>();

        foreach (var game in games)
        {
            var carouselGame = new WrapUpCarouselGameDTO
            {
                CoverURL = game.CoverUrl ?? "",
                GameName = game.Title
            };

            carouselGames.Add(carouselGame);
        }

        return carouselGames;
    }
}
