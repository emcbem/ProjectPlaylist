﻿using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.DeleteRequests;

namespace PlaylistApp.Server.Services.UserAchievementLikeServices;

public class UserAchievementLikeService : IUserAchievementLikeService
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;

    public UserAchievementLikeService(IDbContextFactory<PlaylistDbContext> dbContextFactory)
    {
        this.dbContextFactory = dbContextFactory;
    }
    public async Task<bool> AddUserAchievementLike(AddUserAchievementLike addRequest)
    {
        using var context = dbContextFactory.CreateDbContext();

        var user = await context.UserAccounts
            .Where(x => x.Guid == addRequest.UserId)
            .FirstOrDefaultAsync();

        if (user is null)
        {
            return false;
        }

        var possibleAchievementLike = await context.AchievementLikes
            .Where(x => x.UserId == user.Id)
            .Where(x => x.UserAchievementId == addRequest.UserAchievementId)
            .FirstOrDefaultAsync();

        if (possibleAchievementLike is not null)
        {
            Console.WriteLine("User has already liked this achievement");
            return false;
        }


        AchievementLike achievementLike = new AchievementLike()
        {
            UserId = user.Id,
            UserAchievementId = addRequest.UserAchievementId,
            IsLike = addRequest.IsLike,
            DateLiked = DateTime.UtcNow
        };

        await context.AddAsync(achievementLike);
        await context.SaveChangesAsync();

        return true;
    }

    public async Task<List<UserAchievementDTO>> GetAchievementUserLikesFromUserId(Guid userId)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var user = await context.UserAccounts
            .Where(x => x.Guid == userId)
            .FirstOrDefaultAsync();

        if (user is null)
        {
            return new List<UserAchievementDTO>();
        }

        var UserAchievementLikes = await context.AchievementLikes
            .Include(x => x.UserAchievement)
                .ThenInclude(x => x.Achievement)
            .Include(x => x.User)
                .ThenInclude(x => x.UserImage)
            .Where(x => x.UserId == user.Id)
            .ToListAsync();

        if (UserAchievementLikes is null)
        {
            return new List<UserAchievementDTO>();
        }

        var userAchievements = UserAchievementLikes.Select(x => x.UserAchievement.ToDTO());

        if (!userAchievements.Any())
        {
            return new List<UserAchievementDTO>();
        }

        return userAchievements.ToList();
    }

    public async Task<bool> RemoveUserAchievementLike(RemoveUserAchievementLikeRequest removeRequest)
    {
        using var context = dbContextFactory.CreateDbContext();

        var user = await context.UserAccounts
            .Where(x => x.Guid == removeRequest.userId)
            .FirstOrDefaultAsync();

        if (user is null)
        {
            Console.WriteLine("No user was found");
            return false;
        }

        var achievementlike = await context.AchievementLikes
            .Where(x => x.UserAchievementId == removeRequest.UserAchievementId)
            .Where(x => x.UserId == user.Id)
            .FirstOrDefaultAsync();

        if (achievementlike is null)
        {
            return false;
        }

        context.AchievementLikes.Remove(achievementlike);
        await context.SaveChangesAsync();

        return true;
    }
}
