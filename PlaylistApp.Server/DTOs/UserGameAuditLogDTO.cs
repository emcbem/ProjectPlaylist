using PlaylistApp.Server.Data;

namespace PlaylistApp.Server.DTOs;

public class UserGameAuditLogDTO
{
    public int UserId { get; set; }
    public int PlatformGameId { get; set; }
    public DateTime AuditDate { get; set; }
    public int MinutesBefore { get; set; }
    public int MinutesAfter { get; set; }
}

public static class UserGameAuditLogConverter
{
    public static UserGameAuditLogDTO ToDTO(this UserGameAuditLog userGameAuditLog)
    {
        if (userGameAuditLog is null)
        {
            return new UserGameAuditLogDTO();
        }

        return new UserGameAuditLogDTO
        {
            AuditDate = userGameAuditLog.AuditDate,
            MinutesAfter = userGameAuditLog.MinutesAfter,
            MinutesBefore = userGameAuditLog.MinutesBefore,
            PlatformGameId = userGameAuditLog.PlatformGameId,
            UserId = userGameAuditLog.UserId
        };
    }
}
