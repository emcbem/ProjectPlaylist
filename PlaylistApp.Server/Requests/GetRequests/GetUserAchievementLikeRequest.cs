namespace PlaylistApp.Server.Requests.GetRequests;

public class GetUserAchievementLikeRequest
{
    public Guid? UserId { get; set; }
    public int UserAchievementId { get; set; }
}
