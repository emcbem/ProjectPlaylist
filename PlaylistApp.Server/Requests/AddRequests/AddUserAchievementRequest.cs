namespace PlaylistApp.Server.Requests.AddRequests;

public class AddUserAchievementRequest
{
    public int AchievementId { get; set; }
    public Guid UserGuid { get; set; }
    public bool IsSelfSubmitted { get; set; }
    public DateTime DateAchieved { get; set; }
}
