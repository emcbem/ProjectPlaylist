using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PlaylistApp.Server.Data;

public partial class UserAccount
{
	[Key]
	public int Id { get; set; }

	public string AuthId { get; set; } = null!;

	public Guid Guid { get; set; }

	public int UserImageId { get; set; }

	public string Username { get; set; } = null!;

	public string? Bio { get; set; }

	public int? Strike { get; set; }

	public int? Xp { get; set; }

	public DateTime JoinDate { get; set; }

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

	public virtual ICollection<AchievementLike> AchievementLikes { get; set; } = new List<AchievementLike>();

	public virtual ICollection<Friend> FriendBases { get; set; } = new List<Friend>();

	public virtual ICollection<Friend> FriendRecieveds { get; set; } = new List<Friend>();

	public virtual ICollection<GameReview> GameReviews { get; set; } = new List<GameReview>();

	public virtual ICollection<GoalLike> GoalLikes { get; set; } = new List<GoalLike>();

	public virtual ICollection<Goal> Goals { get; set; } = new List<Goal>();

	public virtual ICollection<List> Lists { get; set; } = new List<List>();

	public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();

	public virtual ICollection<ReviewLike> ReviewLikes { get; set; } = new List<ReviewLike>();

	public virtual ICollection<UserAchievement> UserAchievements { get; set; } = new List<UserAchievement>();

	public virtual ICollection<UserGame> UserGames { get; set; } = new List<UserGame>();

	public virtual ICollection<UserGenre> UserGenres { get; set; } = new List<UserGenre>();

	public virtual UserImage UserImage { get; set; } = null!;

	public virtual ICollection<UserPlatform> UserPlatforms { get; set; } = new List<UserPlatform>();
}
