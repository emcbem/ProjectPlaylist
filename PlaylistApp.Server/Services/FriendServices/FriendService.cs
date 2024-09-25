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
            AcceptedDate = DateTime.Now,
            Base = baseUser,
            BaseId = baseUser.Id,
            Recieved = recievingUser,
            RecievedId = recievingUser.Id,
            IsAccepted = true,
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
            .Where(x => x.Base.Guid == userId)
            .ToListAsync();

        if (friends is null)
        {
            return new List<UserDTO>();
        }

        var friendDTOs = friends.Select(x => x.ToDTO()).ToList();

        var userDTOs = friendDTOs.Select(x => new UserDTO
        {
            Id = x.BaseUser!.Id,
            Bio = x.BaseUser.Bio,
            Strikes = x.BaseUser.Strikes,
            AuthID = x.BaseUser.AuthID,
            CreationDate = x.BaseUser.CreationDate,
            ProfileURL = x.BaseUser.ProfileURL,
            Username = x.BaseUser.Username,
            XP = x.BaseUser.XP,
        }).ToList();

        return userDTOs;
    }

    public async Task<FriendDTO> GetFriendById(int id)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var friend = await context.Friends
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

        var friend = context.Friends.Where(x => x.Id == id);

        if (friend == null)
        {
            return false;
        }

        context.Remove(friend);
        await context.SaveChangesAsync();
        return true;
    }
}
