using Microsoft.EntityFrameworkCore.Infrastructure;
using PlaylistApp.Server.Data;

namespace PlaylistApp.Server.DTOs;

public static class DTOConverter
{
    public static GameDTO ToDTO(this Game game)
    {
        return new GameDTO()
        {
            Id = game.Id,
            Title = game.Title,
            PublishDate = game.PublishDate,
            AgeRating
            = game.AgeRating,
            CoverUrl
            = game.CoverUrl,
            Description = game.Description,
            IdgbId = game.IdgbId,

            //TODO: Calculate hours plays
            //TODO: Calculate total total owned

        };
    }

    public static UserDTO ToDTO(this UserAccount user)
    {
        return new UserDTO()
        {
            Id = user.Id,
            Username = user.Username,
            Bio = user.Bio ?? "",
            Strikes = user.Strike,
            XP = user.Xp,
            CreationDate = user.JoinDate,
            AuthID = user.AuthId,
            //TODO: Get Image URL from Image Table
            //ProfileURL = user.UserImage,
        };
    }

    public static PlatformDTO ToDTO(this Platform platform)
    {
        return new PlatformDTO()
        {
            Id = platform.Id,
            Name = platform.PlatformName,
            logoURL = platform.LogoUrl,
        };
    }

    public static PlatformGameDTO ToDTO(this PlatformGame platformGame)
    {
        return new PlatformGameDTO()
        {
            id = platformGame.Id,
            Game = platformGame.Game.ToDTO(),
            PlatformKey = platformGame.PlatformKey ?? "",
            Platform = platformGame.Platform.ToDTO(),
            PlatformURL = platformGame.PlatformUrl ?? "",
        };
    }

    public static AchievementDTO ToDTO(this Achievement achievement)
    {
        return new AchievementDTO()
        {
            ID = achievement.Id,
            PlatformGame = achievement.PlatformGame.ToDTO(),
            ImageURL = achievement.ImageUrl ?? "",
            Name = achievement.AchievementName,
            Description = achievement.AchievementDesc ?? "",
            // TODO: Calculate this later
            // Get the achievement and all of the users that have completed this achievement. 
            // TotalTimeClaimed = achievement.
        };
    }

    public static FriendDTO ToDTO(this Friend friend)
    {
        return new FriendDTO()
        {
            Id = friend.Id,
            BaseUser = friend.Base.ToDTO(),
            ReceivingUser = friend.Recieved.ToDTO(),
            IsAccepted = friend.IsAccepted,
            DateAccepted = friend.AcceptedDate,
        };
    }

    public static UserGameDTO ToDTO(this UserGame userGame)
    {
        return new UserGameDTO()
        {
            PlatformGame = userGame.PlatformGame.ToDTO(),
            User = userGame.User.ToDTO(),
            TimePlayed = userGame.TimePlayed,
            UserGameId = userGame.Id,
            DateAdded = userGame.DateAdded,
        };
    }

    public static GoalDTO ToDTO(this Goal goal)
    {
        return new GoalDTO()
        {
            Achievement = goal.Achievement.ToDTO(),
            DateAdded = goal.DateAdded,
            DateCompleted = goal.DateCompleted,
            DateToAchieve = goal.DateToAchieve,
            Dislikes = goal.GoalLikes.Where(x => x.IsLike == false).Count(),
            Likes = goal.GoalLikes.Where(x => x.IsLike == true).Count(),
            Id = goal.Id,
            IsCompleted = goal.IsComplete,
            IsCurrent = goal.IsCurrent,
            User = goal.User.ToDTO(),
        };
    }
}
