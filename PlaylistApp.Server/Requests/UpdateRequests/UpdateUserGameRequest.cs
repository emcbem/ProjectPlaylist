using System.Numerics;

namespace PlaylistApp.Server.Requests.UpdateRequests;

public class UpdateUserGameRequest
{
    public int Id { get; set; }
    public DateTime DateAdded { get; set; }
    public long? TimePlayed { get; set; }
}
