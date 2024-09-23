using System.Security.Principal;

namespace PlaylistApp.Server.Requests.AddRequests;

public class AddUserAchievementLike
{
    public int AchievementId { get; set; }
    public Guid UserId { get; set; }
    public bool IsLike { get; set; }
}
