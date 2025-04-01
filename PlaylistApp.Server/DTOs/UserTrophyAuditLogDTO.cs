using PlaylistApp.Server.Data;

namespace PlaylistApp.Server.DTOs;

public class UserTrophyAuditLogDTO
{
    public int UserId { get; set; }
    public DateTime AuditDate { get; set; }
    public int TrophiesBefore { get; set; }
    public int TrophiesAfter { get; set; }
}

public static class UserTrophyAuditLogConverter
{
    public static UserTrophyAuditLogDTO ToDTO(this UserTrophyAuditLog userTrophyAuditLog)
    {
        if (userTrophyAuditLog is null)
        {
            return new UserTrophyAuditLogDTO();
        }

        return new UserTrophyAuditLogDTO
        {
            AuditDate = userTrophyAuditLog.AuditDate,
            TrophiesAfter = userTrophyAuditLog.TrophiesAfter,
            TrophiesBefore = userTrophyAuditLog.TrophiesBefore,
            UserId = userTrophyAuditLog.UserId
        };
    }
}
