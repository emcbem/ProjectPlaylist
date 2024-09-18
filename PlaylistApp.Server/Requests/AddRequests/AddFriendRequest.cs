namespace PlaylistApp.Server.Requests.AddRequests;

public class AddFriendRequest
{
    public Guid BaseUserId { get; set; }
    public Guid RecievingUserId { get; set; }
}
