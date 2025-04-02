
using Microsoft.EntityFrameworkCore;
using NSubstitute.Exceptions;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.DTOs.WrapUpData;
using PlaylistApp.Server.Requests.GetRequests;
using PlaylistApp.Server.Services.Game;
using PlaylistApp.Server.Services.UserGameAuditLogServices;
using PlaylistApp.Server.Services.UserGameServices;

namespace PlaylistApp.Server.Services.WrapUpServices;

public class WrapUpService : IWrapUpService
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;
    private readonly IUserGameAuditLogService userGameAuditLogService;
    private readonly IGameService gameService;
    public WrapUpService(IDbContextFactory<PlaylistDbContext> dbContextFactory, IUserGameAuditLogService userGameAuditLogService, IGameService gameService)
    {
        this.dbContextFactory = dbContextFactory;
        this.userGameAuditLogService = userGameAuditLogService;
        this.gameService = gameService;
    }
    public async Task<List<WrapUpCarouselGameDTO>> ConvertUserGameAuditLogsToCarouselGame(GetWrapUpRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.UserId) || !Guid.TryParse(request.UserId, out var userGuid))
        {
            throw new Exception("Invalid UserId Provided To Convert User Games Audit Logs To Carousel Games");
        }

        var context = await dbContextFactory.CreateDbContextAsync();

        var getUserGameAuditLogsRequest = new GetAuditLogByDateRequest
        {
            UserGuid = userGuid,
            Month = request.Month,
            Year = request.Year
        };

        var games = await userGameAuditLogService.GetUserGameAuditLogByDate(getUserGameAuditLogsRequest);

        if (games == null || !games.Any())
        {
            throw new Exception("No User Games Audit Logs Found For Current User");
        }

        return GatherCarouselGames(games);
    }

    public async Task<WrapUpDTO> OrchestrateWrapUpGathering(GetWrapUpRequest request)
    {
        if (request is null)
        {
            throw new Exception("Invalid GetWrapUpRequest Provided To Orchestrate Wrap Up Gathering");
        }

        var carouselGames = await ConvertUserGameAuditLogsToCarouselGame(request);




        var newWrapUpDTO = new WrapUpDTO()
        {
            GamesPlayed = carouselGames,
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
