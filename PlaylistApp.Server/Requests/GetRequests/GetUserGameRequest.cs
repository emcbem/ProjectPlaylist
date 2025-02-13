namespace PlaylistApp.Server.Requests.GetRequests;

public class GetUserGameRequest
{
    public Guid UserId { get; set; }
    public int PlatformGameId { get; set; }
}
