namespace PlaylistApp.Server.Requests.DeleteRequests;

public class RemoveReviewLikeRequest
{
    public Guid UserId { get; set; }
    public int GameReviewId { get; set; }
}
