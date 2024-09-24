﻿using Microsoft.EntityFrameworkCore.Infrastructure;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.Services.GameReviewService;

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
            AgeRating = game.AgeRating,
            CoverUrl = game.CoverUrl,
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

    public static UserAchievementDTO ToDTO(this UserAchievement userAchievement)
    {
        return new UserAchievementDTO()
        {
            Id = userAchievement.Id,
            Achievement = userAchievement.Achievement.ToDTO(),
            User = userAchievement.User.ToDTO(),
            IsSelfSubmitted = userAchievement.IsSelfSubmitted,
            DateAchieved = userAchievement.DateAchieved,
            Likes = userAchievement.AchievementLikes.Where(x => x.IsLike == true).Count(),
            Dislikes = userAchievement.AchievementLikes.Where(x => x.IsLike == false).Count(),
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

    public static GameReviewDTO ToDTO(this GameReview gameReview)
    {
        return new GameReviewDTO()
        {
            Dislikes = gameReview.ReviewLikes.Where(x => x.IsLike == false).Count(),
            PublishDate = DateOnly.FromDateTime(DateTime.Today),
            Likes = gameReview.ReviewLikes.Where(x => x.IsLike == true).Count(),
            Rating = gameReview.Rating,
            Text = gameReview.Review,
            LastEditDate = DateOnly.FromDateTime(gameReview.LastEditDate ?? DateTime.Today),
        };
    }

    public static ListDTO ToDTO(this List list)
    {
        return new ListDTO()
        {
            CreationDate = list.DateMade,
            IsPublic = list.IsPublic,
            Name = list.ListName,
            OwnerName = list.User.Username,
            Id = list.Id,
            Games = list.ListGames.Select(x => x.ToDTO()).ToList(),
        };
    }

    public static ListGameDTO ToDTO(this ListGame listGame)
    {
        return new ListGameDTO()
        {
            DateAdded = listGame.DateAdded,
            GameId = listGame.GameId,
            Id = listGame.Id,
            ListId = listGame.ListId,
        };
    }

    public static UserPlatformDTO ToDTO(this UserPlatform userPlatform)
    {
        return new UserPlatformDTO()
        {
            GamerTag = userPlatform.Gamertag,
            Id = userPlatform.Id,
            PlatformId = userPlatform.PlatformId,
            UserId = userPlatform.User.Guid,
        };
    }

    public static GenreDTO ToDTO(this Genre genre)
    {
        return new GenreDTO()
        {
            id = genre.Id,
            Name = genre.GenreName,
        };
    }

    public static CompanyDTO ToDTO(this Company company)
    {
        return new CompanyDTO()
        {
            Id = company.Id,
            StartDate = company.StartDate,
            LogoURL = company.LogoUrl,
            Name = company.CompanyName,
            Slug = company.Slug,
        };
    }
}
