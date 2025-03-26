namespace PlaylistApp.Server.Data;

public class UserTrophyAuditLog
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public DateTime AuditDate { get; set; }
    public int TrophiesBefore { get; set; }
    public int TrophiesAfter { get; set; }
    public virtual UserAccount UserAccount { get; set; } = null!;
}
