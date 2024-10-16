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
        using var context = await dbContextFactory.CreateDbContextAsync();

        var user = await context.UserAccounts
            .Where(x => x.Guid == addRequest.UserGuid)
            .FirstOrDefaultAsync();

        if (user == null)
        {
            throw new Exception("The user associated with this User Achievement was not found.");
        }

        UserAchievement newAchievement = new UserAchievement()
        {
            AchievementId = addRequest.AchievementId,
            UserId = user.Id,
            IsSelfSubmitted = addRequest.IsSelfSubmitted,
            DateAchieved = addRequest.DateAchieved.ToUniversalTime(),
        };

        await context.AddAsync(newAchievement);
        await context.SaveChangesAsync();
        return newAchievement.Id;
    }

    public async Task<bool> DeleteUserAchievement(int id)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var UserAchievement = await context.UserAchievements
            .Where(x => x.Id == id)
            .FirstOrDefaultAsync();

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
        using var context = await dbContextFactory.CreateDbContextAsync();

        var userAchievements = await context.UserAchievements
            .Include(x => x.Achievement)
                .ThenInclude(x => x.PlatformGame)
                    .ThenInclude(x => x.Game)
            //.ThenInclude(x => x.InvolvedCompanies)
            //    .ThenInclude(x => x.Company)
            .Include(x => x.Achievement)
                .ThenInclude(x => x.PlatformGame)
                    .ThenInclude(x => x.Platform)
            .Include(x => x.User)
                .ThenInclude(x => x.UserImage)
            .Where(x => x.AchievementId == id)
            .ToListAsync();

        if (userAchievements == null)
        {
            return new List<UserAchievementDTO>();
        }

        return userAchievements.Select(x => x.ToDTO()).ToList();
    }

    public async Task<UserAchievementDTO> GetUserAchievementById(int id)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var achievement = await context.UserAchievements
            .Include(x => x.Achievement)
                .ThenInclude(x => x.PlatformGame)
                    .ThenInclude(x => x.Game)
            //.ThenInclude(x => x.InvolvedCompanies)
            //    .ThenInclude(x => x.Company)
            .Include(x => x.Achievement)
                .ThenInclude(x => x.PlatformGame)
                    .ThenInclude(x => x.Platform)
            .Include(x => x.User)
                .ThenInclude(x => x.UserImage)
            .Where(x => x.Id == id)
            .FirstOrDefaultAsync();

        if (achievement is null)
        {
            return new UserAchievementDTO();
        }

        return achievement.ToDTO();
    }

    public async Task<List<UserAchievementDTO>> GetUserAchievementByUserId(Guid userId)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var achievements = await context.UserAchievements
            .Include(x => x.Achievement)
                .ThenInclude(x => x.PlatformGame)
                    .ThenInclude(x => x.Game)
            //.ThenInclude(x => x.InvolvedCompanies)
            //    .ThenInclude(x => x.Company)
            .Include(x => x.Achievement)
                .ThenInclude(x => x.PlatformGame)
                    .ThenInclude(x => x.Platform)
            .Include(x => x.User)
                .ThenInclude(x => x.UserImage)
            .Where(x => x.User.Guid == userId)
            .ToListAsync();

        if (achievements is null)
        {
            return new List<UserAchievementDTO>();
        }

        return achievements.Select(x => x.ToDTO()).ToList();
    }

    public async Task<UserAchievementDTO> UpdateUserAchievement(UpdateUserAchievementRequest updatedRequest)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var UserAchievementUnderChange = await context.UserAchievements
            .Include(x => x.Achievement)
                .ThenInclude(x => x.PlatformGame)
                    .ThenInclude(x => x.Game)
            //.ThenInclude(x => x.InvolvedCompanies)
            //    .ThenInclude(x => x.Company)
            .Include(x => x.Achievement)
                .ThenInclude(x => x.PlatformGame)
                    .ThenInclude(x => x.Platform)
            .Include(x => x.User)
                .ThenInclude(x => x.UserImage)
            .Where(x => x.Id == updatedRequest.Id)
            .FirstOrDefaultAsync();

        if (UserAchievementUnderChange is null) 
        { 
            return new UserAchievementDTO(); 
        }

        UserAchievementUnderChange.IsSelfSubmitted = updatedRequest.IsSelfSubmitted;
        UserAchievementUnderChange.DateAchieved = updatedRequest.DateAchieved;

        context.Update(UserAchievementUnderChange);
        await context.SaveChangesAsync();

        return UserAchievementUnderChange.ToDTO();
    }
}
