using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;

namespace PlaylistApp.Server.Services.UserPlatformServices;

public class UserPlatformService : IUserPlatformService
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;

    public UserPlatformService(IDbContextFactory<PlaylistDbContext> dbContextFactory)
    {
        this.dbContextFactory = dbContextFactory;
    }

    public async Task<bool> AddUserPlatform(AddUserPlatformRequest request)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var user = await context.UserAccounts
            .Where(x => x.Guid == request.UserId)
            .FirstOrDefaultAsync();

        if (user == null)
        {
            return false;
        }

        var up = context.UserPlatforms
            .Where(x => x.UserId == user.Id && x.PlatformId == request.PlatformId)
            .FirstOrDefault();

		if (up != null)
		{
            return false;
		}

		var userPlatform = new UserPlatform()
        {
            ExternalPlatformId = request.ExternalPlatformId ?? "",
            Gamertag = request.GamerTag ?? "",
            IsPublic = request.IsPublic,
            PlatformId = request.PlatformId,
            UserId = user.Id,
        };

        context.Add(userPlatform);
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteUserPlatform(int userPlatformId)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var userPlatform = await context.UserPlatforms
            .Where(x => x.Id == userPlatformId)
            .FirstOrDefaultAsync();

        if (userPlatform == null)
        {
            return false;
        }

        context.Remove(userPlatform);
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<List<UserPlatformDTO>> GetAllByUser(Guid userId)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var userPlatforms = await context.UserPlatforms
            .Include(x => x.User)
                .ThenInclude(X => X.UserImage)
            .Include(x => x.Platform)
            .Where(x => x.User.Guid == userId)
            .ToListAsync();

        if (!userPlatforms.Any())
        {
            return new List<UserPlatformDTO>();
        }

        return userPlatforms.Select(x => x.ToDTO()).ToList();
    }

    public async Task<UserPlatform?> GetUserPlatfromById(int id)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        return context.UserPlatforms.FirstOrDefault(x => x.Id == id);
    }

    public async Task<UserPlatformDTO> UpdateUserPlatform(UpdateUserPlatformRequest request)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var userPlatform = await context.UserPlatforms
            .Include(x => x.User)
                .ThenInclude(X => X.UserImage)
            .Include(x => x.Platform)
            .Where(x => x.Id == request.Id)
            .FirstOrDefaultAsync();

        if (userPlatform is null)
        {
            return new UserPlatformDTO();
        }

        userPlatform.ExternalPlatformId = request.ExternalPlatformId ?? userPlatform.ExternalPlatformId;
        userPlatform.IsPublic = request.IsPublic;
        userPlatform.Gamertag = request.GamerTag ?? userPlatform.Gamertag;

        context.Update(userPlatform);
        await context.SaveChangesAsync();
        return userPlatform.ToDTO();
    }
}
