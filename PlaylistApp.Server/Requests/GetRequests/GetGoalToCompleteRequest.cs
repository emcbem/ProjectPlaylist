namespace PlaylistApp.Server.Requests.GetRequests;

public class GetGoalToCompleteRequest
{
    public int AchievementId { get; set; }  
    public Guid UserId { get; set; }    
}
