namespace PlaylistApp.Server.Requests.UpdateRequests;

public class AcceptFriendRequest
{
    public int FriendId { get; set; }
    public bool IsAccepted { get; set; }
}
