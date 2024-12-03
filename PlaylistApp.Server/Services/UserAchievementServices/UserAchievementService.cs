using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;
using PlaylistApp.Server.Services.EmailServices;
using PlaylistApp.Server.Services.NotificationServices;
using System.Diagnostics.CodeAnalysis;

namespace PlaylistApp.Server.Services.UserAchievementServices;

public class UserAchievementService : IUserAchievementService
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;
	private readonly INotificationService notificationService;

	public UserAchievementService(IDbContextFactory<PlaylistDbContext> dbContextFactory, INotificationService notificationService)
    {
        this.dbContextFactory = dbContextFactory;
		this.notificationService = notificationService;
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

        var achievement = await context.Achievements.Where(x => x.Id == addRequest.AchievementId).FirstOrDefaultAsync();

        if (achievement == null)
        {
            throw new Exception("Cannot get achievement that doesn't exist");
        }

        UserAchievement newAchievement = new UserAchievement()
        {
            AchievementId = addRequest.AchievementId,
            UserId = user.Id,
            IsSelfSubmitted = addRequest.IsSelfSubmitted,
            DateAchieved = addRequest.DateAchieved.ToUniversalTime(),
        };

		await SendFriendsNotification(user, achievement);

        await context.AddAsync(newAchievement);
        await context.SaveChangesAsync();
        return newAchievement.Id;
    }

	private async Task SendFriendsNotification(UserAccount user, Data.Achievement newAchievement)
	{
		using var context = await dbContextFactory.CreateDbContextAsync();

        var friends = await context.Friends
            .Include(x => x.Base)
            .Include(x => x.Recieved)
            .Where(x => 
                (x.BaseId == user.Id && x.NotifyRecievedFriendOnBaseFriend == true) || 
                (x.RecievedId == user.Id && x.NotifyBaseFriendOnRecievedFriend == true))
            .ToListAsync();

        var users = friends.Select(x =>
        {
            if (x.BaseId == user.Id)
            {
                return x.Recieved;
            }
            return x.Base;
        }).ToList();


		var emails = users.Select(friend =>
        {
            return SendIndividualFriendMail(user, newAchievement, friend);
        }).ToArray();

        await Task.WhenAll(emails.ToArray());
	}

	private async Task SendIndividualFriendMail(UserAccount user, Data.Achievement newAchievement, UserAccount friend)
	{
		 AddNotificationRequest notifcation = GenerateAchievementNotification(user, newAchievement, friend);

         await notificationService.CreateNotification(notifcation);
	}


	private AddNotificationRequest GenerateAchievementNotification(UserAccount user, Data.Achievement newAchievement, UserAccount friend)
	{
        var notificationToCreate = new AddNotificationRequest()
        {
            Body = $"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h1>Hello {friend.Username},</h1>
                <p>
                    Your friend, <strong>{user.Username}</strong>, has completed the achievement <strong>{newAchievement.AchievementName}</strong>.
                </p>
                <p>You should give them a pat on the back!</p>
                <img src="{newAchievement.ImageUrl}" alt="Achievement Image" style="width: 300px; height: auto; border: 1px solid #ccc;" />
            </body>
        </html>
        """,
            Title = $"{user.Username} completed an achievement!",
            Url = "/",
            UserId = friend.Id,
        };
		return notificationToCreate;
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
