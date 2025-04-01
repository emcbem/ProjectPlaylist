using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.GetRequests;

namespace PlaylistApp.Server.Services.UserTrophyAuditLogServices;

public interface IUserTrophyAuditLogService
{
    public Task<bool> AddUserTrophyAuditLog(AddUserTrophyAuditLogRequest request);
    public Task<List<UserTrophyAuditLogDTO>> GetUserTrophyAuditLogByDate(GetAuditLogByDateRequest request);
}
