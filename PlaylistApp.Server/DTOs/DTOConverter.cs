using Microsoft.EntityFrameworkCore.Infrastructure;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.Services.GameReviewService;

namespace PlaylistApp.Server.DTOs;

public static class DTOConverter
{
    public static GameDTO ToDTO(this Game game)
    {
        if (game is null)
        {
            return new GameDTO();
        }

        return new GameDTO()
        {
            Id = game.Id,
            Title = game.Title,
            PublishDate = game.PublishDate,
            AgeRating = game.AgeRating,
            CoverUrl = game.CoverUrl,
            Description = game.Description,
            IdgbId = game.IdgbId,
            Companies = game.InvolvedCompanies.Select(x => x.Company.ToDTO()).ToList(),
            HoursPlayed = game.PlatformGames.Sum(x => x.UserGames.Sum(y => y.TimePlayed)),
            TotalOwned = game.PlatformGames.Sum(x => x.UserGames.Count),
        };
    }

    public static UserDTO ToDTO(this UserAccount user)
    {
        if (user is null)
        {
            return new UserDTO();
        }

        return new UserDTO()
        {
            Id = user.Id,
            Username = user.Username,
            Bio = user.Bio ?? "",
            Strikes = user.Strike,
            XP = user.Xp,
            CreationDate = user.JoinDate,
            AuthID = user.AuthId,
            ProfileURL = user.UserImage?.Url ?? "",
            Platforms = user.UserPlatforms.Select(x => x.Platform.ToDTO()).ToList(),
            Guid = user.Guid,
            GameLists = user.Lists.Select(x => x.ToDTO()).ToList(),
            UserGames = user.UserGames.Select(x => x.ToDTONoUser()).ToList(),
        };
    }

    public static PlatformDTO ToDTO(this Platform platform)
    {
        if (platform is null)
        {
            return new PlatformDTO();
        }

        return new PlatformDTO()
        {
            Id = platform.Id,
            Name = platform.PlatformName,
            logoURL = platform.LogoUrl,
        };
    }

    public static PlatformGameDTO ToDTO(this PlatformGame platformGame)
    {
        if (platformGame is null)
        {
            return new PlatformGameDTO();
        }

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
        if (achievement is null)
        {
            return new AchievementDTO();
        }

        return new AchievementDTO()
        {
            ID = achievement.Id,
            PlatformGame = achievement.PlatformGame.ToDTO(),
            ImageURL = achievement.ImageUrl ?? "",
            Name = achievement.AchievementName,
            Description = achievement.AchievementDesc ?? "",
            TotalTimeClaimed = achievement.UserAchievements.Count
        };
    }

    public static FriendDTO ToDTO(this Friend friend)
    {
        if (friend is null)
        {
            return new FriendDTO();
        }

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
        if (userAchievement is null)
        {
            return new UserAchievementDTO();
        }

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
        if (userGame is null)
        {
            return new UserGameDTO();
        }

        return new UserGameDTO()
        {
            PlatformGame = userGame.PlatformGame.ToDTO(),
            User = userGame.User.ToDTO(),
            TimePlayed = userGame.TimePlayed,
            UserGameId = userGame.Id,
            DateAdded = userGame.DateAdded,
        };
    }
    public static UserGameDTO ToDTONoUser(this UserGame userGame)
    {
        if (userGame is null)
        {
            return new UserGameDTO();
        }

        return new UserGameDTO()
        {
            PlatformGame = userGame.PlatformGame.ToDTO(),
            User = null,
            TimePlayed = userGame.TimePlayed,
            UserGameId = userGame.Id,
            DateAdded = userGame.DateAdded,
        };
    }

    public static GoalDTO ToDTO(this Goal goal)
    {
        if (goal is null)
        {
            return new GoalDTO();
        }

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

    public static GoalLikeDTO ToDTO(this GoalLike goalLike)
    {
        if (goalLike is null)
        {
            return new GoalLikeDTO();
        }

        return new GoalLikeDTO()
        {
            DateLiked = goalLike.DateLiked,
            GoalId = goalLike.GoalId,
            Id = goalLike.GoalId,
            IsLike = goalLike.IsLike,
            UserId = goalLike.User.Guid,
            Goal = goalLike.Goal.ToDTO(),
            User = goalLike.User.ToDTO(),
        };

    }

    public static GameReviewDTO ToDTO(this GameReview gameReview)
    {
        if (gameReview is null)
        {
            return new GameReviewDTO();
        }

        return new GameReviewDTO()
        {
            Dislikes = gameReview.ReviewLikes.Where(x => x.IsLike == false).Count(),
            PublishDate = DateOnly.FromDateTime(gameReview.PublishDate),
            Likes = gameReview.ReviewLikes.Where(x => x.IsLike == true).Count(),
            Rating = gameReview.Rating,
            Text = gameReview.Review,
            LastEditDate = gameReview.LastEditDate.HasValue ? DateOnly.FromDateTime(gameReview.LastEditDate.Value) : null,
            Game = gameReview.Game.ToDTO(),
            User = gameReview.User.ToDTO(),
            Id = gameReview.Id
        };
    }

    public static ListDTO ToDTO(this List list)
    {
        if (list is null)
        {
            return new ListDTO();
        }

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
        if (listGame is null)
        {
            return new ListGameDTO();
        }

        return new ListGameDTO()
        {
            DateAdded = listGame.DateAdded,
            Game = listGame.Game.ToDTO(),
            Id = listGame.Id,
            ListId = listGame.ListId,
        };
    }

    public static UserPlatformDTO ToDTO(this UserPlatform userPlatform)
    {
        if (userPlatform is null)
        {
            return new UserPlatformDTO();
        }

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
        if (genre is null)
        {
            return new GenreDTO();
        }

        return new GenreDTO()
        {
            id = genre.Id,
            Name = genre.GenreName,
        };
    }

    public static CompanyDTO ToDTO(this Company company)
    {
        if (company is null)
        {
            return new CompanyDTO();
        }

        return new CompanyDTO()
        {
            Id = company.Id,
            StartDate = company.StartDate,
            LogoURL = company.LogoUrl,
            Name = company.CompanyName,
            Slug = company.Slug,
        };
    }

    public static ReviewLikeDTO ToDTO(this ReviewLike reviewLike)
    {
        if (reviewLike is null)
        {
            return new ReviewLikeDTO();
        }

        return new ReviewLikeDTO()
        {
            DateLiked = reviewLike.DateLiked,
            GameReviewId = reviewLike.GameReviewId,
            GameReviewed = reviewLike.GameReview.ToDTO(),
            Id = reviewLike.Id,
            IsLike = reviewLike.IsLike,
            UserId = reviewLike.User.Guid,
            User = reviewLike.User.ToDTO()
        };
    }

    public static UserAchievementLikeDTO ToDTO(this AchievementLike userAchievementLike)
    {
        if (userAchievementLike is null)
        {
            return new UserAchievementLikeDTO();
        }

        return new UserAchievementLikeDTO()
        {
            Id = userAchievementLike.Id,
            DateLiked = userAchievementLike.DateLiked,
            IsLike = userAchievementLike.IsLike,
            UserAchievementId = userAchievementLike.UserAchievementId,
            UserId = userAchievementLike.User.Guid,
        };
    }
}
