namespace PlaylistApp.Server.Requests.GetRequests;

public class GetClaimedAchievementsForGameForUserRequest
{
    public int PlatformGameId { get; set; }
    public Guid UserId { get; set; }
}
