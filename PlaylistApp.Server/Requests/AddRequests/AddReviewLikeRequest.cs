namespace PlaylistApp.Server.Requests.AddRequests;

public class AddReviewLikeRequest
{
    public int GameReviewId { get; set; }   
    public Guid Userid { get; set; }
    public bool IsLike { get; set; }
}
