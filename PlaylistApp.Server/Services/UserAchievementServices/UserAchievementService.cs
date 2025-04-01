using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.GetRequests;
using PlaylistApp.Server.Requests.UpdateRequests;
using PlaylistApp.Server.Services.NotificationServices;
using PlaylistApp.Server.Utils;

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

    public async Task AddMultipleUserAchievement(AddMultipleUserAchievementRequest addRequest)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var user = await context.UserAccounts
            .Where(x => x.Guid == addRequest.UserGuid)
            .FirstOrDefaultAsync();

        if (user == null)
        {
            throw new Exception("The user associated with this User Achievement was not found.");
        }

        var requestAchievementIds = addRequest.UserAchievementRequests.Select(r => r.AchievementId).ToList();
        var achievementsFromDb = await context.Achievements.Where(r => requestAchievementIds.Contains(r.Id)).ToListAsync();
        var userAchievements = await context.UserAchievements.Where(x => x.UserId == user.Id).Include(a => a.Achievement).ToListAsync();

        List<UserAchievement> achievementsToAdd = new();

        foreach (var request in addRequest.UserAchievementRequests)
        {
            var achievement = achievementsFromDb.Where(x => x.Id == request.AchievementId).FirstOrDefault();
            if (achievement == null)
            {
                throw new Exception("Cannot get achievement that doesn't exist");
            }

            bool exists = userAchievements.Any(x => x.UserId == user.Id && x.AchievementId == request.AchievementId); // this check isn't working :(
            if (!exists)
            {
                UserAchievement newUserAchievement = new UserAchievement()
                {
                    AchievementId = request.AchievementId,
                    UserId = user.Id,
                    IsSelfSubmitted = request.IsSelfSubmitted,
                    DateAchieved = request.DateAchieved.ToUniversalTime(),
                };

                achievementsToAdd.Add(newUserAchievement);
            }
        }

        await context.AddRangeAsync(achievementsToAdd);
        await context.SaveChangesAsync();
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
        }).Where(x => EmailValidator.IsValidEmail(x.Email)).ToList();


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

    public async Task<bool> DeleteUserAchievementsForUserGame(int userGamePlatformId, int userId)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var platformGame = await context.PlatformGames.Where(x => x.Id == userGamePlatformId).FirstOrDefaultAsync();
        if (platformGame is null) return false;

        var pgAchievements = await context.Achievements.Where(x => x.PlatformGameId == platformGame.Id).ToListAsync();
        var pgAchievementIds = pgAchievements.Select(pgAch => pgAch.Id).ToHashSet();

        var earnedUserAchievements = await context.UserAchievements
            .Where(x => x.UserId == userId &&
            pgAchievementIds.Contains(x.AchievementId))
            .ToListAsync();

        context.UserAchievements.RemoveRange(earnedUserAchievements);
        await context.SaveChangesAsync();

        return true;
    }

    public async Task<List<AchievementDTO>> GetClaimedAchievementsForGameForUser(GetClaimedAchievementsForGameForUserRequest request)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var claimedAchievements = await context.UserAchievements
            .Include(x => x.Achievement)
            .Where(x => x.User.Guid == request.UserId)
            .Where(x => x.Achievement.PlatformGameId == request.PlatformGameId)
            .ToListAsync();

        if (claimedAchievements is null)
        {
            return new List<AchievementDTO>();
        }

        return claimedAchievements.Select(x => x.Achievement.ToDTO()).ToList();
    }

    public async Task<List<UserAchievementDTO>> GetUserAchievementByAchievementId(int id)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var userAchievements = await context.UserAchievements
            .Include(x => x.Achievement)
                .ThenInclude(x => x.PlatformGame)
                    .ThenInclude(x => x.Game)
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
