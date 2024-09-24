namespace PlaylistApp.Server.Requests.DeleteRequests;

public class RemoveGoalLikeRequest
{
    public Guid UserId { get; set; }
    public int GoalId { get; set; }
}
