using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs.PlaystationData;
using PlaylistApp.Server.Requests.AddRequests;
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
        if (newPlaystationGames.AddUserGameRequests is null)
        {
            return false;
        }

        foreach (var request in  newPlaystationGames.AddUserGameRequests)
        {
            await UserGameService.AddUserGame(request);

            var newAuditLog = new AddUserGameAuditLogRequest
            {
                AuditDate = DateTime.Today.ToUniversalTime(),
                MinutesBefore = 0,
                MinutesAfter = request.HoursPlayed,
                PlatformGameId = request.PlatformGameId,
                UserId = request.UserId
            };

            if (newAuditLog is not null)
            {
                await UserGameAuditLogService.AddUserGameAuditLog(newAuditLog);
            }
        }

        return true;
    }
}
