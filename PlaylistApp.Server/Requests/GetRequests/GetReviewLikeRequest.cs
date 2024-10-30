namespace PlaylistApp.Server.Requests.GetRequests;

public class GetReviewLikeRequest
{
    public Guid UserId { get; set; }
    public int GameReviewId { get; set; }
}
