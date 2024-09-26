using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;

namespace PlaylistApp.Server.Services.FriendServices;

public class FriendService : IFriendService
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;

    public FriendService(IDbContextFactory<PlaylistDbContext> dbContextFactory)
    {
        this.dbContextFactory = dbContextFactory;
    }
    public async Task<bool> AcceptFriend(AcceptFriendRequest request)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var user = await context.Friends
            .Where(x => x.Id == request.FriendId)
            .FirstOrDefaultAsync();

        if (user == null)
        {
            return false;
        }

        user.IsAccepted = true;
        user.AcceptedDate = DateTime.UtcNow;

        context.Friends.Update(user);
        await context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> AddFriend(AddFriendRequest request)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var baseUser = await context.UserAccounts
            .Where(x => x.Guid == request.BaseUserId)
            .FirstOrDefaultAsync();

        if (baseUser == null)
        {
            return false;
        }

        var recievingUser = await context.UserAccounts
            .Where(x => x.Guid == request.RecievingUserId)
            .FirstOrDefaultAsync();

        if (recievingUser == null)
        {
            return false;
        }

        var newFriend = new Friend()
        {
            AcceptedDate = DateTime.UtcNow,
            Base = baseUser,
            BaseId = baseUser.Id,
            Recieved = recievingUser,
            RecievedId = recievingUser.Id,
            IsAccepted = false,
        };

        await context.Friends.AddAsync(newFriend);
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<List<UserDTO>> GetAllFriendsByBaseId(Guid userId)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var friends = await context.Friends
            .Include(x => x.Base)
            .Include(x => x.Recieved)
            .Where(x => x.Base.Guid == userId)
            .ToListAsync();

        if (!friends.Any())
        {
            return new List<UserDTO>();
        }

        var friendDTOs = friends.Select(x => x.Recieved.ToDTO()).ToList();

        var userDTOs = friendDTOs.Select(x => new UserDTO
        {
            Id = x.Id,
            AuthID = x.AuthID,
            CreationDate = x.CreationDate,
            Bio = x.Bio,
            ProfileURL = x.ProfileURL,
            Strikes = x.Strikes,
            Username = x.Username,
            XP = x.XP,  
        }).ToList();

        return userDTOs;
    }

    public async Task<FriendDTO> GetFriendById(int id)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var friend = await context.Friends
            .Include(x => x.Base)
            .Include(x => x.Recieved)
            .Where(x => x.Id == id)
            .FirstOrDefaultAsync();

        if (friend == null)
        {
            return new FriendDTO();
        }

        return friend.ToDTO();  
    }

    public async Task<bool> RemoveFriend(int id)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var friend = await context.Friends
            .Include(x => x.Base)
            .Include(x => x.Recieved)
            .Where(x => x.Id == id)
            .FirstOrDefaultAsync();

        if (friend == null)
        {
            return false;
        }

        context.Remove(friend);
        await context.SaveChangesAsync();
        return true;
    }
}
