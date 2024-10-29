namespace PlaylistApp.Server.Requests.UpdateRequests;

public class UpdateUserAchievementLikeRequest
{
    public int UserAchievementId { get; set; }
    public Guid UserId { get; set; }
    public bool IsLike { get; set; }
}
