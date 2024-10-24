namespace PlaylistApp.Server.Requests.UpdateRequests;

public class UpdateReviewLikeRequest
{
    public Guid UserId { get; set; }
    public int GameReviewId { get; set; }
    public bool IsLike { get; set; }
}
