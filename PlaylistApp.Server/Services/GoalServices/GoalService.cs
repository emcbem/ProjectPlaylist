using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;
using System.Runtime.InteropServices;

namespace PlaylistApp.Server.Services.GoalServices;

public class GoalService : IGoalService
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;

    public GoalService(IDbContextFactory<PlaylistDbContext> dbContextFactory)
    {
        this.dbContextFactory = dbContextFactory;
    }

    public async Task<int> AddGoal(AddGoalRequest request)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var user = await context.UserAccounts
            .Where(x => x.Guid == request.UserId)
            .FirstOrDefaultAsync();

        if (user == null)
        {
            return 0;
        }

        Goal newGoal = new Goal()
        {
            DateAdded = DateTime.Today,
            DateToAchieve = request.DateToAchieve,
            AchievementId = request.AchievementId,
            IsComplete = false,
            IsCurrent = request.IsCurrent,
            UserId = user.Id
        };

        await context.AddAsync(newGoal);
        await context.SaveChangesAsync();
        return newGoal.Id;
    }

    public async Task<bool> DeleteGoal(int id)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var goal = await context.Goals
            .Where(x => x.Id == id)
            .FirstOrDefaultAsync();

        if (goal == null)
        {
            return false;
        }

        context.Remove(goal);
        await context.SaveChangesAsync();
        return true;

    }

    public async Task<GoalDTO> GetGoalById(int id)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var goal = await context.Goals
            .Where(x => x.Id == id)
            .FirstOrDefaultAsync();

        if (goal == null)
        {
            return new GoalDTO();
        }

        return goal.ToDTO();
    }

    public async Task<List<GoalDTO>> GetGoalsFromUser(Guid userId)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var user = await context.UserAccounts
            .Where(x => x.Guid == userId)
            .FirstOrDefaultAsync();

        if (user == null)
        {
            return new List<GoalDTO>();
        }

        var goals = await context.Goals
            .Where(x => x.UserId == user.Id)
            .ToListAsync();

        if (!goals.Any())
        {
            return new List<GoalDTO>();
        }

        return goals.Select(x => x.ToDTO()).ToList();
    }

    public async Task<GoalDTO> UpdateGoal(UpdateGoalRequest request)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        Goal goal = new Goal()
        {
            DateToAchieve = request.DateToAchieve,
            IsComplete = request.IsComplete,
            IsCurrent = request.IsCurrent,
        };

        context.Update(goal);
        await context.SaveChangesAsync();
        return goal.ToDTO();
    }
}
