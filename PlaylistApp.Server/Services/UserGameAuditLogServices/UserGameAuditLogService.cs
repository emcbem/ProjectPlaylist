using Microsoft.AspNetCore.Mvc.TagHelpers;
using Microsoft.EntityFrameworkCore;
using NSubstitute;
using NSubstitute.Exceptions;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.GetRequests;
using PlaylistApp.Server.Services.PlatformGameServices;
using PlaylistApp.Server.Services.UserGameServices;
using PlaylistApp.Server.Services.UserServices;

namespace PlaylistApp.Server.Services.UserGameAuditLogServices;

public class UserGameAuditLogService : IUserGameAuditLogService
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;
    private readonly IUserService userService;
    private readonly IPlatformGameService platformGameService;

    public UserGameAuditLogService(IDbContextFactory<PlaylistDbContext> dbContextFactory, IUserService userService, IPlatformGameService platformGameService)
    {
        this.dbContextFactory = dbContextFactory;
        this.userService = userService;
        this.platformGameService = platformGameService;
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

    public async Task<List<UserGameAuditLogDTO>> GetAllUserGameAuditLogsByDate(GetAuditLogByDateRequest request)
    {
        if (request is null)
        {
            return new List<UserGameAuditLogDTO>();
        }

        using var context = await dbContextFactory.CreateDbContextAsync();

        var allUserGameAuditLogs = await context.UserGameAuditLogs
            .Include(x => x.PlatformGame)
                .ThenInclude(x => x.Game)
            .Where(x => x.UserAccount.Guid == request.UserGuid &&
                        x.AuditDate.Year == request.Year &&
                        (request.Month == -1 || x.AuditDate.Month == request.Month))
            .OrderBy(x => x.AuditDate)
            .Select(x => x.ToDTO())
            .ToListAsync();

        if (allUserGameAuditLogs is null)
        {
            return new List<UserGameAuditLogDTO>();
        }

        return allUserGameAuditLogs;
    }

    public async Task<List<GameDTO>> GetUserGamesFromUserGameAuditLogDate(GetAuditLogByDateRequest request)
    {
        if (request is null)
        {
            return new List<GameDTO>();
        }

        using var context = await dbContextFactory.CreateDbContextAsync();

        var allUserGameAuditLogs = await context.UserGameAuditLogs
            .Include(x => x.PlatformGame)
                .ThenInclude(x => x.Game)
            .Where(x => x.UserAccount.Guid == request.UserGuid && x.AuditDate.Year == request.Year && (request.Month == -1 || x.AuditDate.Month == request.Month))
            .Select(x => x.ToDTO())
            .ToListAsync();

        var platformGameIds = allUserGameAuditLogs.Select(x => x.PlatformGameId);

        var platformGames = new List<PlatformGameDTO>();

        foreach (var id in platformGameIds)
        {
            platformGames.Add(await platformGameService.GetPlatformGameById(id));
        }

        var games = platformGames.Select(x => x.Game).ToList();

        return games;
    }
}
