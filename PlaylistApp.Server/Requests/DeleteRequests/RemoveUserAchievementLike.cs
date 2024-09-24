namespace PlaylistApp.Server.Requests.DeleteRequests;

public class RemoveUserAchievementLike
{
    public Guid userId { get; set; }
    public int UserAchievementLikeId { get; set; }
}
