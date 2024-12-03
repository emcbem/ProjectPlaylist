namespace PlaylistApp.Server.Requests.UpdateRequests;

public class UpdateUserRequest
{
    public Guid Guid { get; set; }
    public string? Username { get; set; }
    public string? Bio { get; set; }
    public int Strikes { get; set; }
    public int XP { get; set; }
    public int UserImageID { get; set; }
    public bool? NotifyOnReviewLiked { get; set; }
    public bool? NotifyOnReviewDisliked { get; set; }
    public bool? NotifyOnGoalEndingSoon { get; set; }
    public bool? NotifyOnGoalLiked { get; set; }
    public bool? NotifyOnGoalDisliked { get; set; }
    public bool? NotifyOnAchievementLiked { get; set; }
    public bool? NotifyOnAchievementDisliked { get; set; }
    public bool? NotifyOnFriendRequestRecieved { get; set; }
    public bool? NotifyOnFriendRequestAccepted { get; set; }
}
