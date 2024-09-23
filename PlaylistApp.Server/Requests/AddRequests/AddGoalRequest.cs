namespace PlaylistApp.Server.Requests.AddRequests;

public class AddGoalRequest
{
    public Guid UserId { get; set; }
    public int AchievementId { get; set; }
    public DateTime DateToAchieve { get; set; }
    public bool IsCurrent { get; set; }
}
