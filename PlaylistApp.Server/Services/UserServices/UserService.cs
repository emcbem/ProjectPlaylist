using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.UpdateRequests;

namespace PlaylistApp.Server.Services.UserServices;

public class UserService : IUserService
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;

    public UserService(IDbContextFactory<PlaylistDbContext> dbContextFactory)
    {
        this.dbContextFactory = dbContextFactory;
    }

    public async Task<bool> DeleteUserById(Guid userId)
    {
        using var context = dbContextFactory.CreateDbContext();
        var user = await context.UserAccounts.Where(x => x.Guid == userId).FirstOrDefaultAsync();
        if (user == null)
        {
            return false;
        }
        try
        {
            var result = context.UserAccounts.Remove(user);
            await context.SaveChangesAsync();
            return true;
        }
        catch 
        {
            return false;
        }
    }

    public async Task<UserDTO> GetUserById(Guid guid)
    {
        using var context = dbContextFactory.CreateDbContext();
        var user = await context.UserAccounts.Where(x => x.Guid == guid).FirstOrDefaultAsync();
        if (user == null)
        {
            return new UserDTO();
        }
        return user.ToDTO();
    }

    public async Task<List<UserDTO>> GetUsersByName(string username)
    {
        using var context = dbContextFactory.CreateDbContext();
        var users = await context.UserAccounts.Where(x => x.Username.Contains(username)).ToListAsync();
        if (!users.Any())
        {
            return new List<UserDTO>();
        }
        return users.Select(x => x.ToDTO()).ToList();
    }

    public async Task<UserDTO> UpdateUser(UpdateUserRequest updateUserRequest)
    {
        using var context = dbContextFactory.CreateDbContext();
        var userUnderChange = await context.UserAccounts
            .Include(x => x.UserGenres)
            .Include(x => x.UserPlatforms)
            .Where(x => x.Guid == updateUserRequest.Guid)
            .FirstOrDefaultAsync();
        
        if (userUnderChange is null)
        {
            throw new Exception("User Not Found");
        }

        userUnderChange.Xp = updateUserRequest.XP;
        userUnderChange.Username = updateUserRequest.UserName;
        userUnderChange.Bio = updateUserRequest.Bio;
        userUnderChange.Strike = updateUserRequest.Strikes;
        userUnderChange.UserImageId = updateUserRequest.UserImageID;

        context.UserAccounts.Update(userUnderChange);
        await context.SaveChangesAsync();

        return userUnderChange.ToDTO();
    }

}
