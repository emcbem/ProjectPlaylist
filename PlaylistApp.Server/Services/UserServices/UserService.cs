using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;
using PsnApiWrapperNet.Model;
using System;
using System.Security.Claims;

namespace PlaylistApp.Server.Services.UserServices;

internal static class UserIncluder
{
    public static IQueryable<Data.UserAccount> IncludeDumbUser(this DbSet<Data.UserAccount> user)
    {
        return user
            .Include(x => x.UserImage);
    }
}

public class UserService : IUserService
{
	private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;

	public UserService(IDbContextFactory<PlaylistDbContext> dbContextFactory)
	{
		this.dbContextFactory = dbContextFactory;
	}

    public async Task<UserAccount> GetUser(System.Linq.Expressions.Expression<Func<UserAccount, bool>>? predicate)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var user = context.UserAccounts
        .Include(x => x.UserImage)
        .FirstOrDefault(predicate);

        if (user != null)
        {
            user.UserGenres = context.UserGenres
                .Where(g => g.UserId == user.Id)
                .ToList();

            user.UserPlatforms = context.UserPlatforms
                .Where(p => p.UserId == user.Id)
                .ToList();

            user.Lists = context.Lists
                .Where(l => l.UserId == user.Id)
                .ToList();

            user.Notifications = context.Notifications
                .Where(n => n.UserId == user.Id)
                .OrderByDescending(n => n.DateNotified)
                .ToList();

            user.UserGames = context.UserGames
                .Where(ug => ug.UserId == user.Id)
                .OrderByDescending(ug => ug.DateAdded)
                .Include(ug => ug.PlatformGame)
                    .ThenInclude(pg => pg.Game)
                .ToList();
        }

		return user;
    }

    public async Task<bool> DeleteUserById(Guid userId)
	{
		using var context = await dbContextFactory.CreateDbContextAsync();

		var user = await context.UserAccounts
			.Where(x => x.Guid == userId)
			.FirstOrDefaultAsync();

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

	public async Task<UserDTO> GetUserByAuthId(string authId)
	{
		var user = await GetUser(x => x.AuthId == authId);
		if (user is null)
		{
			return new UserDTO();
		}

		return user.ToDTO();
	}

	public async Task<UserDTO> GetUserById(Guid guid)
	{
		var user = await GetUser(x => x.Guid == guid);

		if (user == null)
		{
			return new UserDTO();
		}

		return user.ToDTO();
	}

	public async Task<UserDTO> GetUsersByName(string username)
	{
		var user = await GetUser(x => x.Username.Contains(username));

		if (user is null)
		{
			return new UserDTO();
		}

		return user.ToPrivateDTO();
	}

    public async Task<List<UserDTO>> GetUsersBySearchQuery(string searchQuery)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var user = await context.UserAccounts
            .IncludeDumbUser()
            .Where(x => x.Username.ToLower().Contains(searchQuery.ToLower()) || (x.Bio != null && x.Bio.ToLower().Contains(searchQuery.ToLower())))
            .ToListAsync();

        if (user is null)
        {
            return new List<UserDTO>();
        }

        return user.Select(x => x.ToPrivateDTO()).ToList();
    }

    public async Task<UserDTO> UpdateUser(UpdateUserRequest updateUserRequest)
	{
		using var context = await dbContextFactory.CreateDbContextAsync();

		var userUnderChange = await GetUser(x => x.Guid == updateUserRequest.Guid);

		if (userUnderChange is null)
		{
			throw new Exception("User Not Found");
		}

		userUnderChange.Xp = updateUserRequest.XP;
		userUnderChange.Username = updateUserRequest.Username ?? userUnderChange.Username;
		userUnderChange.Bio = updateUserRequest.Bio;
		userUnderChange.Strike = updateUserRequest.Strikes;
		userUnderChange.UserImageId = updateUserRequest.UserImageID;
		userUnderChange.TotalTrophies = updateUserRequest.TotalTrophies;

		userUnderChange.NotifyOnReviewLiked = updateUserRequest.NotifyOnReviewLiked;
        userUnderChange.NotifyOnReviewDisliked = updateUserRequest.NotifyOnReviewDisliked;
		userUnderChange.NotifyOnGoalEndingSoon = updateUserRequest.NotifyOnGoalEndingSoon;
        userUnderChange.NotifyOnGoalLiked = updateUserRequest.NotifyOnGoalLiked;
        userUnderChange.NotifyOnGoalDisliked = updateUserRequest.NotifyOnGoalDisliked;
        userUnderChange.NotifyOnAchievementLiked = updateUserRequest.NotifyOnAchievementLiked;
        userUnderChange.NotifyOnAchievementDisliked = updateUserRequest.NotifyOnAchievementDisliked;
        userUnderChange.NotifyOnFriendRequestRecieved = updateUserRequest.NotifyOnFriendRequestRecieved;
        userUnderChange.NotifyOnFriendRequestAccepted = updateUserRequest.NotifyOnFriendRequestAccepted;

        context.UserAccounts.Update(userUnderChange);
		await context.SaveChangesAsync();

		return userUnderChange.ToDTO();
	}

	public async Task<bool> AddUser(AddUserRequest addUserRequest)
	{
		if (addUserRequest.Username == null || addUserRequest.AuthId == null)
		{
			return false;
		}

		var user = new UserAccount();
		user.Username = addUserRequest.Username;
		user.AuthId = addUserRequest.AuthId;
		user.Xp = 0;
		user.Bio = "";
		user.Guid = Guid.NewGuid();
		user.Strike = 0;
		user.JoinDate = DateTime.Now.ToUniversalTime();
		user.UserImageId = 1;

		using var context = await dbContextFactory.CreateDbContextAsync();

		context.UserAccounts.Add(user);
		await context.SaveChangesAsync();

		return true;
	}

	public async Task<bool> StrikeUser(string guid)
	{
		using var context = await dbContextFactory.CreateDbContextAsync();

		Guid g = new Guid(guid);

		var user = await GetUser(x => x.Guid == g);

        if (user == null)
		{
			return false;
		}

        user.Strike = user.Strike + 1;

		context.UserAccounts.Update(user);
		await context.SaveChangesAsync();

		return true;
    }

    public Task<UserAccount> GetUserFromClaims(ClaimsPrincipal claims)
    {
		//TODO: STart back up here ethan, this is where we need to go from here :)
        throw new NotImplementedException();
    }
}
