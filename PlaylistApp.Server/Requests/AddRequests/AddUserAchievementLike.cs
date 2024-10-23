using System.Security.Principal;

namespace PlaylistApp.Server.Requests.AddRequests;

public class AddUserAchievementLike
{
    public int UserAchievementId { get; set; }
    public Guid UserId { get; set; }
    public bool IsLike { get; set; }
}
