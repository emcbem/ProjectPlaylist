using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.DeleteRequests;

namespace PlaylistApp.Server.Services.GoalLikeServices;

public class GoalLikeService : IGoalLikeService
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;

    public GoalLikeService(IDbContextFactory<PlaylistDbContext> dbContextFactory)
    {
        this.dbContextFactory = dbContextFactory;
    }

    public async Task<bool> AddGoalLike(AddGoalLikeRequest request)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var user = await context.UserAccounts
            .Where(x => x.Guid == request.UserId)
            .FirstOrDefaultAsync();

        if (user == null)
        {
            return false;
        }

        GoalLike newGoalLike = new GoalLike()
        {
            DateLiked = DateTime.Today,
            GoalId = request.GoalId,
            UserId = user.Id
        };

        await context.AddAsync(newGoalLike);
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<List<GoalDTO>> GetGoalLikesFromUser(Guid userId)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var user = await context.UserAccounts
            .Where(x => x.Guid == userId)
            .FirstOrDefaultAsync();

        if (user == null)
        {
            return new List<GoalDTO>();
        }

        var goalLikes = await context.GoalLikes
            .Where(x => x.UserId == user.Id)
            .ToListAsync();

        return goalLikes.Select(x => x.Goal.ToDTO()).ToList();   
    }

    public async Task<bool> RemoveGoalLike(RemoveGoalLikeRequest request)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var user = await context.UserAccounts
            .Where(x => x.Guid == request.UserId)
            .FirstOrDefaultAsync();

        if (user == null)
        {
            return false;
        }

        var goalLike = await context.GoalLikes
            .Where(x => x.UserId == user.Id)
            .Where(x => x.GoalId == request.GoalId)
            .FirstOrDefaultAsync();

        if (goalLike == null)
        {
            return false;
        }

        context.Remove(goalLike);
        await context.SaveChangesAsync();
        return true;
    }
}
