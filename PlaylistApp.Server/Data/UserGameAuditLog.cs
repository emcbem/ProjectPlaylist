namespace PlaylistApp.Server.Data;

public class UserGameAuditLog
{
    public int Id { get; set; }
    public int PlatformGameId { get; set; }
    public int UserId { get; set; }
    public DateTime AuditDate { get; set; }
    public long? MinutesBefore { get; set; }
    public long? MinutesAfter { get; set; }
    public virtual UserAccount UserAccount { get; set; } = null!;
    public virtual PlatformGame PlatformGame { get; set; } = null!;
}
