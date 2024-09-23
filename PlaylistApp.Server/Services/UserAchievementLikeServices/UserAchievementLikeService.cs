using Microsoft.EntityFrameworkCore;
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

        var usr = context.UserAccounts.Where(x => x.Guid == addRequest.UserId).FirstOrDefaultAsync();

        if (usr is null) { return false; }

        AchievementLike achievementLike = new AchievementLike()
        {
            UserId = usr.Id,
            UserAchievementId = addRequest.AchievementId,
            IsLike = addRequest.IsLike,
        };

        await context.AddAsync(achievementLike);
        await context.SaveChangesAsync();

        return true;
    }

    public async Task<List<UserAchievementDTO>> GetAchievementUserLikesFromUserId(Guid id)
    {
        using var context = dbContextFactory.CreateDbContext();

        var usr = context.UserAccounts.Where(x => x.Guid == id).FirstOrDefaultAsync();

        var UserAchievementLikes = await context.AchievementLikes.Where(x => x.UserId == usr.Id).ToListAsync();

        if (UserAchievementLikes is null) { return new List<UserAchievementDTO>(); }

        // return UserAchievementLikes.Select(x => x.ToD)
        return new List<UserAchievementDTO>();
    }

    public async Task<bool> RemoveUserAchievementLike(RemoveUserAchievementLike removeRequest)
    {
        using var context = dbContextFactory.CreateDbContext();

        var achievementlike = await context.AchievementLikes.Where(x => x.Id == removeRequest.UserAchievementLikeId).FirstOrDefaultAsync();

        if (achievementlike is null) { return false; }

        context.AchievementLikes.Remove(achievementlike);
        await context.SaveChangesAsync();

        return true;
    }
}
