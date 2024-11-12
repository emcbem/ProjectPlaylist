using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.DeleteRequests;
using PlaylistApp.Server.Requests.GetRequests;
using PlaylistApp.Server.Requests.UpdateRequests;

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

        var possibleGoalLike = await context.GoalLikes
            .Where(x => x.User.Guid == request.UserId)
            .Where(x => x.GoalId == request.GoalId)
            .FirstOrDefaultAsync();

        if (possibleGoalLike != null)
        {
            return false;
        }

        GoalLike newGoalLike = new GoalLike()
        {
            DateLiked = DateTime.UtcNow,
            GoalId = request.GoalId,
            UserId = user.Id,
            IsLike = request.IsLike
        };

        await context.AddAsync(newGoalLike);
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<GoalLikeDTO> GetGoalLike(GetGoalLikeRequest request)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var goalLike = await context.GoalLikes
            .Include(x => x.User)
                .ThenInclude(x => x.UserImage)
            .Include(x => x.Goal)
                .ThenInclude(x => x.Achievement)
                    .ThenInclude(x => x.PlatformGame)
                        .ThenInclude(x => x.Game)
            .Where(x => x.User.Guid == request.UserId)
            .Where(x => x.Id == request.GoalId)
            .FirstOrDefaultAsync();

        if (goalLike == null)
        {
            return new GoalLikeDTO();
        }

        return goalLike.ToDTO();
    }

    public async Task<List<GoalDTO>> GetGoalLikesFromUser(Guid userId)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var goalLikes = await context.GoalLikes
            .Include(x => x.User)
                .ThenInclude(x => x.UserImage)
            .Include(x => x.Goal)
                .ThenInclude(x => x.Achievement)
                    .ThenInclude(x => x.PlatformGame)
                        .ThenInclude(x => x.Game)
            .Where(x => x.User.Guid == userId)
            .ToListAsync();

        return goalLikes.Select(x => x.Goal.ToDTO()).ToList();   
    }

    public async Task<bool> RemoveGoalLike(RemoveGoalLikeRequest request)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var goalLike = await context.GoalLikes
            .Where(x => x.User.Guid == request.UserId)
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

    public async Task<bool> UpdateGoalLike(UpdateGoalLikeRequest request)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var goalLikeUnderChange = await context.GoalLikes
            .Where(x => x.Id == request.Id)
            .FirstOrDefaultAsync();

        if (goalLikeUnderChange == null)
        {
            return false;
        }

        goalLikeUnderChange.IsLike = request.IsLike;
        goalLikeUnderChange.DateLiked = DateTime.UtcNow;

        context.Update(goalLikeUnderChange);
        await context.SaveChangesAsync();
        return true;
    }
}
