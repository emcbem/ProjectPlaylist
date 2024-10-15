using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
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
		using var context = await dbContextFactory.CreateDbContextAsync();

		var user = await context.UserAccounts
			.Include(x => x.UserGenres)
			.Include(x => x.UserPlatforms)
			.Include(x => x.Lists)
			.Include(x => x.UserGames)
				.ThenInclude(x => x.PlatformGame)
					.ThenInclude(x => x.Game)
						.ThenInclude(x => x.InvolvedCompanies)
							.ThenInclude(x => x.Company)
			.Include(x => x.UserGames)
				.ThenInclude(x => x.PlatformGame)
					.ThenInclude(x => x.Platform)
			.Include(x => x.UserImage)
			.Where(x => x.AuthId == authId)
			.FirstOrDefaultAsync();

		if (user is null)
		{
			return new UserDTO();
		}

		return user.ToDTO();
	}

	public async Task<UserDTO> GetUserById(Guid guid)
	{
		using var context = await dbContextFactory.CreateDbContextAsync();

		var user = await context.UserAccounts
			.Include(x => x.UserGenres)
			.Include(x => x.UserPlatforms)
			.Include(x => x.Lists)
			.Include(x => x.UserGames)
				.ThenInclude(x => x.PlatformGame)
					.ThenInclude(x => x.Game)
						.ThenInclude(x => x.InvolvedCompanies)
							.ThenInclude(x => x.Company)
			.Include(x => x.UserGames)
				.ThenInclude(x => x.PlatformGame)
					.ThenInclude(x => x.Platform)
			.Include(x => x.UserImage)
			.Where(x => x.Guid == guid)
			.FirstOrDefaultAsync();

		if (user == null)
		{
			return new UserDTO();
		}

		return user.ToDTO();
	}

	public async Task<UserDTO> GetUsersByName(string username)
	{
		using var context = await dbContextFactory.CreateDbContextAsync();

		var user = await context.UserAccounts
			.Include(x => x.UserGenres)
			.Include(x => x.UserPlatforms)
			.Include(x => x.Lists)
			.Include(x => x.UserGames)
				.ThenInclude(x => x.PlatformGame)
					.ThenInclude(x => x.Game)
						.ThenInclude(x => x.InvolvedCompanies)
							.ThenInclude(x => x.Company)
			.Include(x => x.UserGames)
				.ThenInclude(x => x.PlatformGame)
					.ThenInclude(x => x.Platform)
			.Include(x => x.UserImage)
			.Where(x => x.Username.Contains(username))
			.FirstOrDefaultAsync();

		if (user is null)
		{
			return new UserDTO();
		}

		return user.ToDTO();
	}

	public async Task<UserDTO> UpdateUser(UpdateUserRequest updateUserRequest)
	{
		using var context = await dbContextFactory.CreateDbContextAsync();

		var userUnderChange = await context.UserAccounts
			.Include(x => x.UserGenres)
			.Include(x => x.UserPlatforms)
			.Include(x => x.Lists)
			.Include(x => x.UserGames)
				.ThenInclude(x => x.PlatformGame)
					.ThenInclude(x => x.Game)
						.ThenInclude(x => x.InvolvedCompanies)
							.ThenInclude(x => x.Company)
			.Include(x => x.UserGames)
				.ThenInclude(x => x.PlatformGame)
					.ThenInclude(x => x.Platform)
			.Include(x => x.UserImage)
			.Where(x => x.Guid == updateUserRequest.Guid)
			.FirstOrDefaultAsync();

		if (userUnderChange is null)
		{
			throw new Exception("User Not Found");
		}

		userUnderChange.Xp = updateUserRequest.XP;
		userUnderChange.Username = updateUserRequest.UserName ?? userUnderChange.Username;
		userUnderChange.Bio = updateUserRequest.Bio;
		userUnderChange.Strike = updateUserRequest.Strikes;
		userUnderChange.UserImageId = updateUserRequest.UserImageID;

		context.UserAccounts.Update(userUnderChange);
		await context.SaveChangesAsync();

		return userUnderChange.ToDTO();
	}

	public async Task AddUser(AddUserRequest addUserRequest)
	{
		if (addUserRequest.Username == null || addUserRequest.AuthId == null)
		{
			throw new Exception("Cannot make a user without a username or an authID");
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
	}

}
