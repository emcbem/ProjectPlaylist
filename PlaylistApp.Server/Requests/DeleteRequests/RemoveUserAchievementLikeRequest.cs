namespace PlaylistApp.Server.Requests.DeleteRequests;

public class RemoveUserAchievementLikeRequest
{
    public Guid userId { get; set; }
    public int UserAchievementId { get; set; }
}
