using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs.PlaystationData;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.GetRequests;
using PlaylistApp.Server.Services.UserGameAuditLogServices;
using PlaylistApp.Server.Services.UserGameServices;

namespace PlaylistApp.Server.Services.PlaystationServices;

public class AddNewPlaystationGamesService
{
    private readonly IUserGameService UserGameService;
    private readonly IUserGameAuditLogService UserGameAuditLogService;

    public AddNewPlaystationGamesService(IUserGameService userGameService, IUserGameAuditLogService userGameAuditLogService)
    {
        UserGameService = userGameService;
        this.UserGameAuditLogService = userGameAuditLogService;
    }

    public async Task<bool> AddNewPlaystationGames(NewPlaystationGames newPlaystationGames)
    {
        if (newPlaystationGames.AddUserGameRequests is null || !newPlaystationGames.AddUserGameRequests.Any())
        {
            return false;
        }

        var tasks = newPlaystationGames.AddUserGameRequests.Select(async request =>
        {
            var getRequest = new GetUserGameRequest
            {
                PlatformGameId = request.PlatformGameId,
                UserId = request.UserId
            };

            var possibleUserGame = await UserGameService.GetUserGameByPlatformGameAndUser(getRequest);

            if (possibleUserGame.PlatformGame is not null)
            {
                return;
            }

            await UserGameService.AddUserGame(request);

            var newAuditLog = new AddUserGameAuditLogRequest
            {
                AuditDate = DateTime.UtcNow,
                MinutesBefore = 0,
                MinutesAfter = request.HoursPlayed / 60,
                PlatformGameId = request.PlatformGameId,
                UserId = request.UserId
            };

            await UserGameAuditLogService.AddUserGameAuditLog(newAuditLog);
        });

        await Task.WhenAll(tasks);

        return true;
    }

}
