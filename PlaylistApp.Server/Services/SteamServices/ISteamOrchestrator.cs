using PlaylistApp.Server.DTOs.CombinationData;
using PlaylistApp.Server.DTOs.SteamData;

namespace PlaylistApp.Server.Services.SteamServices
{
    public interface ISteamOrchestrator
    {
        Task<ItemAction> CollectActionItemsFromSteam(SteamActionLogRequest steamActionLogRequest);
    }
}