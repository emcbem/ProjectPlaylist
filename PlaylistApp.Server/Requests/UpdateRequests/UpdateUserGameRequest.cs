using System.Numerics;

namespace PlaylistApp.Server.Requests.UpdateRequests;

public class UpdateUserGameRequest
{
    public int UserGameId { get; set; }
    public DateTime DateAdded { get; set; }
    public long? TimePlayed { get; set; }
}
