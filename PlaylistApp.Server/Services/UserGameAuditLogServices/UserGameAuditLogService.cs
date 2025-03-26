using Microsoft.EntityFrameworkCore;
using NSubstitute;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.GetRequests;
using PlaylistApp.Server.Services.UserGameServices;
using PlaylistApp.Server.Services.UserServices;

namespace PlaylistApp.Server.Services.UserGameAuditLogServices;

public class UserGameAuditLogService : IUserGameAuditLogService
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;
    private readonly IUserService userService;

    public UserGameAuditLogService(IDbContextFactory<PlaylistDbContext> dbContextFactory, IUserService userService)
    {
        this.dbContextFactory = dbContextFactory;
        this.userService = userService;
    }

    public async Task<bool> AddUserGameAuditLog(AddUserGameAuditLogRequest request)
    {
        if (request is null)
        {
            return false;
        }

        using var context = await dbContextFactory.CreateDbContextAsync();

        var possibleUser = await userService.GetUserById(request.UserId);

        if (possibleUser is null)
        {
            return false;
        }

        UserGameAuditLog newAuditLog = new UserGameAuditLog
        {
            AuditDate = request.AuditDate,
            MinutesAfter = request.MinutesAfter,
            MinutesBefore = request.MinutesBefore,
            PlatformGameId = request.PlatformGameId,
            UserId = possibleUser.Id
        };

        await context.UserGameAuditLogs.AddAsync(newAuditLog);
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<List<UserGameDTO>> GetUserGameAuditLogByDate(GetUserGameAuditLogRequest request)
    {
        if (request is null)
        {
            throw new ArgumentNullException(nameof(request));
        }

        using var context = await dbContextFactory.CreateDbContextAsync();

        var allUserGames = await context.UserGames
            .Include(x => x.PlatformGame)
                .ThenInclude(x => x.Game)
            .Where(x => x.User.Guid == request.UserGuid && x.DateAdded.Year == request.Year && (request.Month == -1 || x.DateAdded.Month == request.Month))
            .Select(x => x.ToDTO())
            .ToListAsync();

        return allUserGames;
    }

}
