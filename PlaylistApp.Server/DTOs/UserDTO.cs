using PlaylistApp.Server.Data;
using System.Runtime;

namespace PlaylistApp.Server.DTOs;

public class UserDTO
{
    public int Id { get; set; }
    public string Username { get; set; } = "";
    public string Bio { get; set; } = "";
    public int? Strikes { get; set; }
    public int? XP { get; set; }
    public DateTime CreationDate { get; set; }
    public string? AuthID { get; set; }
    public string? ProfileURL { get; set; }
	public int ProfileImageId { get; set; }
    public Guid Guid { get; set; }
	public bool? UsernamePrivate { get; set; }
	public bool? LibraryPrivate { get; set; }
	public bool? GamertagsPrivate { get; set; }
	public bool? BioPrivate { get; set; }
	public bool? XpPrivate { get; set; }
	public bool? FavoriteGenresPrivate { get; set; }
	public bool? FavoriteGamesPrivate { get; set; }
	public bool? PlaytimePrivate { get; set; }
	public bool? ReviewsPrivate { get; set; }
	public bool? GoalPrivate { get; set; }
	public bool? AchievementsPrivate { get; set; }
	public bool? NotifyOnReviewLiked { get; set; }
	public bool? NotifyOnReviewDisliked { get; set; }
	public bool? NotifyOnGoalEndingSoon { get; set; }
	public bool? NotifyOnGoalLiked { get; set; }
	public bool? NotifyOnGoalDisliked { get; set; }
	public bool? NotifyOnAchievementLiked { get; set; }
	public bool? NotifyOnAchievementDisliked { get; set; }
	public bool? NotifyOnFriendRequestRecieved { get; set; }
	public bool? NotifyOnFriendRequestAccepted { get; set; }
	public List<UserGameDTO>? UserGames {get;set;}
    public List<ListDTO>? GameLists {get;set;}
    public List<PlatformDTO>? Platforms { get; set; }
    public List<NotificationDTO>? Notifications { get; set; }

}

public static class UserConverter
{
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
			ProfileImageId = user.UserImage?.Id ?? 0,
			Platforms = user.UserPlatforms.Select(x => x.Platform.ToDTO()).ToList(),
			Guid = user.Guid,
			GameLists = user.Lists.Select(x => x.ToDTO()).ToList(),
			UserGames = user.UserGames.Select(x => x.ToDTONoUser()).ToList(),
			AchievementsPrivate = user.AchievementsPrivate,
			BioPrivate = user.BioPrivate,
			FavoriteGamesPrivate = user.FavoriteGamesPrivate,
			FavoriteGenresPrivate = user.FavoriteGenresPrivate,
			GamertagsPrivate = user.GamertagsPrivate,
			GoalPrivate = user.GoalPrivate,
			LibraryPrivate = user.LibraryPrivate,
			Notifications = user.Notifications.Select(x => x.ToDto()).ToList(),
			NotifyOnAchievementDisliked = user.NotifyOnAchievementDisliked,
			NotifyOnAchievementLiked = user.NotifyOnAchievementLiked,
			NotifyOnFriendRequestAccepted = user.NotifyOnFriendRequestAccepted,
			NotifyOnFriendRequestRecieved = user.NotifyOnFriendRequestRecieved,
			NotifyOnGoalDisliked = user.NotifyOnGoalDisliked,
			NotifyOnGoalEndingSoon = user.NotifyOnGoalEndingSoon,
			NotifyOnGoalLiked = user.NotifyOnGoalLiked,
			NotifyOnReviewDisliked = user.NotifyOnReviewDisliked,
			NotifyOnReviewLiked = user.NotifyOnReviewLiked,
			PlaytimePrivate = user.PlaytimePrivate,
			ReviewsPrivate = user.ReviewsPrivate,
			UsernamePrivate = user.UsernamePrivate,
			XpPrivate = user.XpPrivate
		};
	}

	public static UserDTO ToPrivateDTO(this UserAccount user)
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
			ProfileURL = user.UserImage?.Url ?? "",
			ProfileImageId = user.UserImage?.Id ?? 0,
			Platforms = user.UserPlatforms.Select(x => x.Platform.ToDTO()).ToList(),
			Guid = user.Guid,
			GameLists = user.Lists.Select(x => x.ToDTO()).ToList(),
			UserGames = user.UserGames.Select(x => x.ToDTONoUser()).ToList(),
			AchievementsPrivate = user.AchievementsPrivate,
			BioPrivate = user.BioPrivate,
			FavoriteGamesPrivate = user.FavoriteGamesPrivate,
			FavoriteGenresPrivate = user.FavoriteGenresPrivate,
			GamertagsPrivate = user.GamertagsPrivate,
			GoalPrivate = user.GoalPrivate,
			LibraryPrivate = user.LibraryPrivate,
			NotifyOnAchievementDisliked = user.NotifyOnAchievementDisliked,
			NotifyOnAchievementLiked = user.NotifyOnAchievementLiked,
			NotifyOnFriendRequestAccepted = user.NotifyOnFriendRequestAccepted,
			NotifyOnFriendRequestRecieved = user.NotifyOnFriendRequestRecieved,
			NotifyOnGoalDisliked = user.NotifyOnGoalDisliked,
			NotifyOnGoalEndingSoon = user.NotifyOnGoalEndingSoon,
			NotifyOnGoalLiked = user.NotifyOnGoalLiked,
			NotifyOnReviewDisliked = user.NotifyOnReviewDisliked,
			NotifyOnReviewLiked = user.NotifyOnReviewLiked,
			PlaytimePrivate = user.PlaytimePrivate,
			ReviewsPrivate = user.ReviewsPrivate,
			UsernamePrivate = user.UsernamePrivate,
			XpPrivate = user.XpPrivate
		};
	}
}
