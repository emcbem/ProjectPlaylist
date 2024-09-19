namespace PlaylistApp.Server.Requests.UpdateRequests;

public class UpdateUserAchievementRequest
{
    public int Id { get; set; }
    public bool IsSelfSubmitted { get; set; }
    public DateTime DateAchieved { get; set; }
}
