using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;
using System.Diagnostics.CodeAnalysis;

namespace PlaylistApp.Server.Services.UserAchievementServices;

public class UserAchievementService : IUserAchievementService
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;

    public UserAchievementService(IDbContextFactory<PlaylistDbContext> dbContextFactory)
    {
        this.dbContextFactory = dbContextFactory;
    }

    public async Task<int> AddUserAchievement(AddUserAchievementRequest addRequest)
    {
        using var context = dbContextFactory.CreateDbContext();

        var usr = await context.UserAccounts.Where(x => x.Guid == addRequest.UserGuid).FirstOrDefaultAsync();

        if (usr == null)
        {
            throw new Exception("The user associated with this User Achievement was not found.");
        }

        UserAchievement newAchievement = new UserAchievement()
        {
            AchievementId = addRequest.AchievementId,
            UserId = usr.Id,
            IsSelfSubmitted = addRequest.IsSelfSubmitted,
            DateAchieved = addRequest.DateAchieved,
        };
        
        return newAchievement.Id;
    }

    public async Task<bool> DeleteUserAchievement(int id)
    {
        using var context = dbContextFactory.CreateDbContext();

        var UserAchievement = await context.UserAchievements.Where(x => x.Id == id).FirstOrDefaultAsync();

        if (UserAchievement == null)
        {
            return false;

        }
        
        context.UserAchievements.Remove(UserAchievement);
        await context.SaveChangesAsync();

        return true;
    }

    public async Task<List<UserAchievementDTO>> GetUserAchievementByAchievementId(int id)
    {
        using var context = dbContextFactory.CreateDbContext();

        var userAchievements = await context.UserAchievements.Where(x => x.AchievementId == id).ToListAsync();

        if (userAchievements == null)
        {
            return new List<UserAchievementDTO>();
        }

        return userAchievements.Select(x => x.ToDTO()).ToList();
    }

    public async Task<UserAchievementDTO> GetUserAchievementById(int id)
    {
        using var context = dbContextFactory.CreateDbContext();

        var achievement = await context.UserAchievements.Where(x => x.AchievementId == id).FirstOrDefaultAsync();

        if ( achievement is null)
        {
            return new UserAchievementDTO();
        }

        return achievement.ToDTO();
    }

    public async Task<List<UserAchievementDTO>> GetUserAchievementByUserId(Guid userId)
    {
        using var context = dbContextFactory.CreateDbContext();

        var user = await context.UserAccounts.Where(x => x.Guid == userId).FirstOrDefaultAsync();

        if (user is null)
        {
            throw new Exception($"The user with id {userId} does not exist");
        }

        var achievements = await context.UserAchievements.Where(x => x.UserId == user.Id).ToListAsync();

        if (achievements is null)
        {
            return new List<UserAchievementDTO>();
        }

        return achievements.Select(x => x.ToDTO()).ToList();
    }

    public async Task<UserAchievementDTO> UpdateUserAchievement(UpdateUserAchievementRequest updatedRequest)
    {
        using var context = dbContextFactory.CreateDbContext();

        var UserAchievementUnderChange = await context.UserAchievements.Where(x => x.Id == updatedRequest.Id).FirstOrDefaultAsync();

        if (UserAchievementUnderChange is null) { return new UserAchievementDTO(); }

        UserAchievementUnderChange.IsSelfSubmitted = updatedRequest.IsSelfSubmitted;
        UserAchievementUnderChange.DateAchieved = updatedRequest.DateAchieved;

        return UserAchievementUnderChange.ToDTO();
    }
}
