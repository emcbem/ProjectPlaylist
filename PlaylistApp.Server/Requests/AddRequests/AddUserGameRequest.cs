using PlaylistApp.Server.Data;

namespace PlaylistApp.Server.Requests.AddRequests;

public class AddUserGameRequest
{
    public Guid UserId { get; set; }
    public int PlatformGameId { get; set; }
}
