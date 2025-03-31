namespace PlaylistApp.Server.Requests.AddRequests;

public class AddUserTrophyAuditLogRequest
{
    public Guid UserId { get; set; }
    public int TrophiesBefore { get; set; }
    public int TrophiesAfter { get; set; }
}
