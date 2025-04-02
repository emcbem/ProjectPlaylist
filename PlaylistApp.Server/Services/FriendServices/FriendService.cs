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
            NotifyBaseFriendOnRecievedFriend = true,
            NotifyRecievedFriendOnBaseFriend = true,
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
                .ThenInclude(x => x.UserImage)
            .Include(x => x.Base)
                .ThenInclude(x => x.UserGames)
            .Include(x => x.Recieved)
                .ThenInclude(x => x.UserImage)
            .Include(x => x.Recieved)
                .ThenInclude(x => x.UserGames)
            .Where(x => x.Base.Guid == userId || x.Recieved.Guid == userId)
            .Where(x => x.IsAccepted == true)
            .ToListAsync();


        if (!friends.Any())
        {
            return new List<UserDTO>();
        }

        var friendDTOs = friends.SelectMany(x => new[] { x.Base.ToDTO(), x.Recieved.ToDTO() }.Where(x => x.Guid != userId)).ToList();

        var userDTOs = friendDTOs.Select(x => new UserDTO
        {
            Id = x.Id,
            Guid = x.Guid,
            AuthID = x.AuthID,
            CreationDate = x.CreationDate,
            Bio = x.Bio,
            ProfileURL = x.ProfileURL,
            ProfileImageId = x.ProfileImageId,
            UserGames = x.UserGames,
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

    public async Task<FriendDTO> GetFriendByBaseId(int id)
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

    public async Task<bool> RemoveFriend(int friendId, int userId)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var friend = await context.Friends
            .Include(x => x.Base)
            .Include(x => x.Recieved)
            .Where(x => (x.BaseId == friendId) || (x.RecievedId == friendId))
            .Where(x => (x.BaseId == userId) || (x.RecievedId == userId))
            .FirstOrDefaultAsync();

        if (friend == null)
        {
            return false;
        }

        context.Remove(friend);
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<List<FriendDTO>> GetBasePendingRequests(int userId)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        // find the users base of the GUID userid then get the number id from that

        var pendingFriends = await context.Friends
            .Include(x => x.Base)
            .Include(x => x.Recieved)
            .Where(x => (x.BaseId == userId) || (x.RecievedId == userId))
            .Where(x => x.IsAccepted == false)
            .ToListAsync();

        return pendingFriends.Select(x => x.ToDTO()).ToList();
    }
}
