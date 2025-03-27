namespace PlaylistApp.Server.Requests.AddRequests;

public class AddUserGameAuditLogRequest
{
    public Guid UserId { get; set; }
    public int PlatformGameId { get; set; }
    public DateTime AuditDate { get; set; }
    public int MinutesBefore { get; set; } 
    public int MinutesAfter { get; set; }
}
