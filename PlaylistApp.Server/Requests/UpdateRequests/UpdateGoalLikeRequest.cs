namespace PlaylistApp.Server.Requests.UpdateRequests;

public class UpdateGoalLikeRequest
{
    public int Id { get; set; }
    public bool? IsLike { get; set; }
}
