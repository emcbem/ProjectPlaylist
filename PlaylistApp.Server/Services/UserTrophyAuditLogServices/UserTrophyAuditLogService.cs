using Microsoft.EntityFrameworkCore;
using MimeKit.Cryptography;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.GetRequests;
using PlaylistApp.Server.Services.UserServices;

namespace PlaylistApp.Server.Services.UserTrophyAuditLogServices;

public class UserTrophyAuditLogService : IUserTrophyAuditLogService
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;
    private readonly IUserService userService;

    public UserTrophyAuditLogService(IDbContextFactory<PlaylistDbContext> dbContextFactory, IUserService userService)
    {
        this.dbContextFactory = dbContextFactory;
        this.userService = userService;
    }

    public async Task<bool> AddUserTrophyAuditLog(AddUserTrophyAuditLogRequest request)
    {
        if (request is null)
        {
            return false;
        }

        var context = await dbContextFactory.CreateDbContextAsync();

        var possibleUser = await userService.GetUserById(request.UserId);

        if (possibleUser is null)
        {
            return false;
        }

        var newUserTrophyAuditLog = new UserTrophyAuditLog
        {
            AuditDate = DateTime.UtcNow,
            UserId = possibleUser.Id,
            TrophiesBefore = request.TrophiesBefore,
            TrophiesAfter = request.TrophiesAfter
        };

        await context.UserTrophyAuditLogs.AddAsync(newUserTrophyAuditLog);
        await context.SaveChangesAsync();

        return true;
    }

    public async Task<List<UserTrophyAuditLogDTO>> GetUserTrophyAuditLogByDate(GetAuditLogByDateRequest request)
    {
        if (request is null)
        {
            return new List<UserTrophyAuditLogDTO>();
        }

        var possibleUser = await userService.GetUserById(request.UserGuid);

        if (possibleUser is null)
        {
            return new List<UserTrophyAuditLogDTO>();
        }

        var context = await dbContextFactory.CreateDbContextAsync();

        var allTrophyAuditLogs = await context.UserTrophyAuditLogs
            .Where(x => x.UserId == possibleUser.Id && x.AuditDate.Year == request.Year && (request.Month == -1 || x.AuditDate.Month == request.Month))
            .Select(x => x.ToDTO())
            .ToListAsync();

        return allTrophyAuditLogs;
    }
}
