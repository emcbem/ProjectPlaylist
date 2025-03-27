namespace PlaylistApp.Server.Requests.AddRequests;

public class AddUserGameAuditLogRequest
{
    public Guid UserId { get; set; }
    public int PlatformGameId { get; set; }
    public DateTime AuditDate { get; set; }
    public long? MinutesBefore { get; set; } 
    public long? MinutesAfter { get; set; }
}
