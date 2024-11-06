namespace PlaylistApp.Server.Requests.GetRequests;

public class GetGoalLikeRequest
{
    public int GoalId { get; set; }
    public Guid UserId { get; set; }
}
