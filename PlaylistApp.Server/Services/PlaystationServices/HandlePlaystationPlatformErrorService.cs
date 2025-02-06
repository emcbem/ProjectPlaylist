using PlaylistApp.Server.DTOs.CombinationData;
using PlaylistApp.Server.DTOs.PlaystationData;

namespace PlaylistApp.Server.Services.PlaystationServices;

public class HandlePlaystationPlatformErrorService
{
    public async Task<ItemAction> SendPlaystationPlatformErrorsToUser(NewPlaystationGames newPlaystationGames)
    {
        if (newPlaystationGames.ItemAction is null)
        {
            return new ItemAction();
        }

        await Task.CompletedTask;
        return newPlaystationGames.ItemAction;
    }
}
