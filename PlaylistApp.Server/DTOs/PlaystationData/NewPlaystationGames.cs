using PlaylistApp.Server.DTOs.CombinationData;
using PlaylistApp.Server.Requests.AddRequests;

namespace PlaylistApp.Server.DTOs.PlaystationData;

public class NewPlaystationGames
{
    public List<ItemAction> ItemAction { get; set; } = new();
    public List<AddUserGameRequest> AddUserGameRequests { get; set; } = new();
}
