namespace PlaylistApp.Server.Requests.AddRequests;

public class AddGoalLikeRequest
{
    public int GoalId { get; set; }
    public Guid UserId { get; set; }
    public bool IsLike { get; set; }    
}
