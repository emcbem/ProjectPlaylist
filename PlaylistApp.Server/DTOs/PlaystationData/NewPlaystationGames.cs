using PlaylistApp.Server.DTOs.CombinationData;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;

namespace PlaylistApp.Server.DTOs.PlaystationData;

public class NewPlaystationGames
{
    public List<ItemAction> ItemAction { get; set; } = new();
    public List<AddUserGameRequest> AddUserGameRequests { get; set; } = new();
    public List<UpdateUserGameRequest>? UpdateUserGameRequests { get; set; }
}
