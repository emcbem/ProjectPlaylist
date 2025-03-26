using PlaylistApp.Server.DTOs.PlaystationData;
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
        }

        return true;
    }
}
