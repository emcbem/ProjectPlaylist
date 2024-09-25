using PlaylistApp.Server.DTOs;

namespace PlaylistApp.Server.Requests.UpdateRequests;

public class UpdateListRequest
{
    public int ListId { get; set; }
    public string ListName { get; set; } = "Default name";
    public List<GameDTO> NewGames { get; set; } = new List<GameDTO>();
    public List<ListGameDTO> GamesToRemove { get; set; } = new List<ListGameDTO>();
    public bool IsPublic { get; set; }  
}
