using Microsoft.EntityFrameworkCore;

namespace PlaylistApp.Server.Data;

public partial class PlaylistDbContext : DbContext
{
	public PlaylistDbContext()
	{
	}

	public PlaylistDbContext(DbContextOptions<PlaylistDbContext> options)
		: base(options)
	{
	}

	public virtual DbSet<Achievement> Achievements { get; set; }

	public virtual DbSet<AchievementLike> AchievementLikes { get; set; }

	public virtual DbSet<Company> Companies { get; set; }

	public virtual DbSet<Friend> Friends { get; set; }

	public virtual DbSet<Game> Games { get; set; }

	public virtual DbSet<GameGenre> GameGenres { get; set; }

	public virtual DbSet<GameReview> GameReviews { get; set; }

	public virtual DbSet<Genre> Genres { get; set; }

	public virtual DbSet<Goal> Goals { get; set; }

	public virtual DbSet<GoalLike> GoalLikes { get; set; }

	public virtual DbSet<InvolvedCompany> InvolvedCompanies { get; set; }

	public virtual DbSet<List> Lists { get; set; }

	public virtual DbSet<ListGame> ListGames { get; set; }

	public virtual DbSet<Notification> Notifications { get; set; }

	public virtual DbSet<Platform> Platforms { get; set; }

	public virtual DbSet<PlatformGame> PlatformGames { get; set; }

	public virtual DbSet<ReviewLike> ReviewLikes { get; set; }

	public virtual DbSet<UserAccount> UserAccounts { get; set; }

	public virtual DbSet<UserAchievement> UserAchievements { get; set; }

	public virtual DbSet<UserGame> UserGames { get; set; }

	public virtual DbSet<UserGenre> UserGenres { get; set; }

	public virtual DbSet<UserImage> UserImages { get; set; }

	public virtual DbSet<UserPlatform> UserPlatforms { get; set; }
	public virtual DbSet<UserTrophyAuditLog> UserTrophyAuditLogs { get; set; }
	public virtual DbSet<UserGameAuditLog> UserGameAuditLogs { get; set; }

	protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		=> optionsBuilder.EnableSensitiveDataLogging();



	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.Entity<Achievement>(entity =>
		{
			entity.HasKey(e => e.Id).HasName("achievement_pkey");

			entity.ToTable("achievement", "playlistdb");

			entity.Property(e => e.Id).HasColumnName("id").UseIdentityAlwaysColumn();
			entity.Property(e => e.AchievementDesc).HasColumnName("achievement_desc");
			entity.Property(e => e.AchievementName).HasColumnName("achievement_name");
			entity.Property(e => e.ImageUrl).HasColumnName("image_url");
			entity.Property(e => e.PlatformGameId).HasColumnName("platform_game_id");
			entity.Property(e => e.ExternalId).HasColumnName("external_id");

			entity.HasOne(d => d.PlatformGame).WithMany(p => p.Achievements)
				.HasForeignKey(d => d.PlatformGameId)
				.HasConstraintName("achievement_platform_game_id_fkey");
		});

		modelBuilder.Entity<AchievementLike>(entity =>
		{
			entity.HasKey(e => e.Id).HasName("achievement_like_pkey");

			entity.ToTable("achievement_like", "playlistdb");

			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.DateLiked).HasColumnName("date_liked");
			entity.Property(e => e.IsLike).HasColumnName("is_like");
			entity.Property(e => e.UserAchievementId).HasColumnName("user_achievement_id");
			entity.Property(e => e.UserId).HasColumnName("user_id");

			entity.HasOne(d => d.UserAchievement).WithMany(p => p.AchievementLikes)
				.HasForeignKey(d => d.UserAchievementId)
				.HasConstraintName("achievement_like_user_achievement_id_fkey");

			entity.HasOne(d => d.User).WithMany(p => p.AchievementLikes)
				.HasForeignKey(d => d.UserId)
				.HasConstraintName("achievement_like_user_id_fkey");
		});

		modelBuilder.Entity<Company>(entity =>
		{
			entity.HasKey(e => e.Id).HasName("company_pkey");

			entity.ToTable("company", "playlistdb");

			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.CompanyName)
				.HasMaxLength(64)
				.HasColumnName("company_name");
			entity.Property(e => e.Description).HasColumnName("description");
			entity.Property(e => e.LogoUrl).HasColumnName("logo_url");
			entity.Property(e => e.Slug).HasColumnName("slug");
			entity.Property(e => e.StartDate).HasColumnName("start_date");
			entity.Property(e => e.Checksum).HasColumnName("checksum");
            entity.Property(e => e.IgdbId).HasColumnName("igdb_id");

            entity.Property(e => e.Id)
					.UseIdentityAlwaysColumn();

        });

		modelBuilder.Entity<Friend>(entity =>
		{
			entity.HasKey(e => e.Id).HasName("friend_pkey");

			entity.ToTable("friend", "playlistdb");

			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.AcceptedDate).HasColumnName("accepted_date");
			entity.Property(e => e.BaseId).HasColumnName("base_id");
			entity.Property(e => e.IsAccepted).HasColumnName("is_accepted");
			entity.Property(e => e.NotifyBaseFriendOnRecievedFriend)
				.HasDefaultValue(false)
				.HasColumnName("notify_base_friend_on_recieved_friend");
			entity.Property(e => e.NotifyRecievedFriendOnBaseFriend)
				.HasDefaultValue(false)
				.HasColumnName("notify_recieved_friend_on_base_friend");
			entity.Property(e => e.RecievedId).HasColumnName("recieved_id");

			entity.HasOne(d => d.Base).WithMany(p => p.FriendBases)
				.HasForeignKey(d => d.BaseId)
				.HasConstraintName("friend_base_id_fkey");

			entity.HasOne(d => d.Recieved).WithMany(p => p.FriendRecieveds)
				.HasForeignKey(d => d.RecievedId)
				.HasConstraintName("friend_recieved_id_fkey");
		});

		modelBuilder.Entity<Game>(entity =>
		{
			entity.HasKey(e => e.Id).HasName("game_pkey");

			entity.ToTable("game", "playlistdb");

			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.AgeRating)
				.HasMaxLength(30)
				.HasColumnName("age_rating");
			entity.Property(e => e.CoverUrl).HasColumnName("cover_url");
			entity.Property(e => e.Description).HasColumnName("description");
			entity.Property(e => (int?)e.IgdbId).HasColumnName("idgb_id");
			entity.Property(e => e.PublishDate).HasColumnName("publish_date");
			entity.Property(e => e.Title)
				.HasMaxLength(350)
				.HasColumnName("title");
            entity.Property(e => e.Checksum).HasColumnName("checksum");
        });

		modelBuilder.Entity<GameGenre>(entity =>
		{
			entity.HasKey(e => e.Id).HasName("game_genre_pkey");

			entity.ToTable("game_genre", "playlistdb");

			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.GameId).HasColumnName("game_id");
			entity.Property(e => e.GenreId).HasColumnName("genre_id");

			entity.HasOne(d => d.Game).WithMany(p => p.GameGenres)
				.HasForeignKey(d => d.GameId)
				.OnDelete(DeleteBehavior.ClientSetNull)
				.HasConstraintName("game_genre_game_id_fkey");

			entity.HasOne(d => d.Genre).WithMany(p => p.GameGenres)
				.HasForeignKey(d => d.GenreId)
				.OnDelete(DeleteBehavior.ClientSetNull)
				.HasConstraintName("game_genre_genre_id_fkey");
		});

		modelBuilder.Entity<GameReview>(entity =>
		{
			entity.HasKey(e => e.Id).HasName("game_review_pkey");

			entity.ToTable("game_review", "playlistdb");

			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.GameId).HasColumnName("game_id");
			entity.Property(e => e.LastEditDate).HasColumnName("last_edit_date");
			entity.Property(e => e.PlaytimeAtModification).HasColumnName("playtime_at_modification");
			entity.Property(e => e.PlaytimeAtReview).HasColumnName("playtime_at_review");
			entity.Property(e => e.PublishDate).HasColumnName("publish_date");
			entity.Property(e => e.Rating).HasColumnName("rating");
			entity.Property(e => e.Review).HasColumnName("review");
			entity.Property(e => e.UserId).HasColumnName("user_id");

			entity.HasOne(d => d.Game).WithMany(p => p.GameReviews)
				.HasForeignKey(d => d.GameId)
				.OnDelete(DeleteBehavior.ClientSetNull)
				.HasConstraintName("game_review_game_id_fkey");

			entity.HasOne(d => d.User).WithMany(p => p.GameReviews)
				.HasForeignKey(d => d.UserId)
				.HasConstraintName("game_review_user_id_fkey");
		});

		modelBuilder.Entity<Genre>(entity =>
		{
			entity.HasKey(e => e.Id).HasName("genre_pkey");

			entity.ToTable("genre", "playlistdb");

			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.GenreName).HasColumnName("genre_name");
            entity.Property(e => e.IgdbId).HasColumnName("igdb_id");
            entity.Property(e => e.Checksum).HasColumnName("checksum");
        });

		modelBuilder.Entity<Goal>(entity =>
		{
			entity.HasKey(e => e.Id).HasName("goal_pkey");

			entity.ToTable("goal", "playlistdb");

			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.AchievementId).HasColumnName("achievement_id");
			entity.Property(e => e.DateAdded).HasColumnName("date_added");
			entity.Property(e => e.DateCompleted).HasColumnName("date_completed");
			entity.Property(e => e.DateToAchieve).HasColumnName("date_to_achieve");
			entity.Property(e => e.IsComplete).HasColumnName("is_complete");
			entity.Property(e => e.IsCurrent).HasColumnName("is_current");
			entity.Property(e => e.UserId).HasColumnName("user_id");

			entity.HasOne(d => d.Achievement).WithMany(p => p.Goals)
				.HasForeignKey(d => d.AchievementId)
				.OnDelete(DeleteBehavior.ClientSetNull)
				.HasConstraintName("goal_achievement_id_fkey");

			entity.HasOne(d => d.User).WithMany(p => p.Goals)
				.HasForeignKey(d => d.UserId)
				.HasConstraintName("goal_user_id_fkey");
		});

		modelBuilder.Entity<GoalLike>(entity =>
		{
			entity.HasKey(e => e.Id).HasName("goal_like_pkey");

			entity.ToTable("goal_like", "playlistdb");

			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.DateLiked).HasColumnName("date_liked");
			entity.Property(e => e.GoalId).HasColumnName("goal_id");
			entity.Property(e => e.IsLike).HasColumnName("is_like");
			entity.Property(e => e.UserId).HasColumnName("user_id");

			entity.HasOne(d => d.Goal).WithMany(p => p.GoalLikes)
				.HasForeignKey(d => d.GoalId)
				.HasConstraintName("goal_like_goal_id_fkey");

			entity.HasOne(d => d.User).WithMany(p => p.GoalLikes)
				.HasForeignKey(d => d.UserId)
				.HasConstraintName("goal_like_user_id_fkey");
		});

		modelBuilder.Entity<InvolvedCompany>(entity =>
		{
			entity.HasKey(e => e.Id).HasName("involved_company_pkey");

			entity.ToTable("involved_company", "playlistdb");

			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.CompanyId).HasColumnName("company_id");
			entity.Property(e => e.GameId).HasColumnName("game_id");
			entity.Property(e => e.IsDeveloper).HasColumnName("is_developer");
			entity.Property(e => e.IsPublisher).HasColumnName("is_publisher");

			entity.HasOne(d => d.Company).WithMany(p => p.InvolvedCompanies)
				.HasForeignKey(d => d.CompanyId)
				.OnDelete(DeleteBehavior.ClientSetNull)
				.HasConstraintName("involved_company_company_id_fkey");

			entity.HasOne(d => d.Game).WithMany(p => p.InvolvedCompanies)
				.HasForeignKey(d => d.GameId)
				.OnDelete(DeleteBehavior.ClientSetNull)
				.HasConstraintName("involved_company_game_id_fkey");
		});

		modelBuilder.Entity<List>(entity =>
		{
			entity.HasKey(e => e.Id).HasName("list_pkey");

			entity.ToTable("list", "playlistdb");

			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.DateMade).HasColumnName("date_made");
			entity.Property(e => e.IsPublic).HasColumnName("is_public");
			entity.Property(e => e.ListName)
				.HasMaxLength(30)
				.HasColumnName("list_name");
			entity.Property(e => e.UserId).HasColumnName("user_id");

			entity.HasOne(d => d.User).WithMany(p => p.Lists)
				.HasForeignKey(d => d.UserId)
				.HasConstraintName("list_user_id_fkey");
		});

		modelBuilder.Entity<ListGame>(entity =>
		{
			entity.HasKey(e => e.Id).HasName("list_game_pkey");

			entity.ToTable("list_game", "playlistdb");

			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.DateAdded).HasColumnName("date_added");
			entity.Property(e => e.GameId).HasColumnName("game_id");
			entity.Property(e => e.ListId).HasColumnName("list_id");

			entity.HasOne(d => d.Game).WithMany(p => p.ListGames)
				.HasForeignKey(d => d.GameId)
				.OnDelete(DeleteBehavior.ClientSetNull)
				.HasConstraintName("list_game_game_id_fkey");

			entity.HasOne(d => d.List).WithMany(p => p.ListGames)
				.HasForeignKey(d => d.ListId)
				.HasConstraintName("list_game_list_id_fkey");
		});

		modelBuilder.Entity<Notification>(entity =>
		{
			entity.HasKey(e => e.Id).HasName("notification_pkey");

			entity.ToTable("notification", "playlistdb");

			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.Body).HasColumnName("body");
			entity.Property(e => e.DateNotified).HasColumnName("date_notified");
			entity.Property(e => e.Title).HasColumnName("title");
			entity.Property(e => e.UserId).HasColumnName("user_id");
			entity.Property(e => e.UserNotified).HasColumnName("user_notified");
			entity.Property(e => e.Url).HasColumnName("url");


			entity.HasOne(d => d.User).WithMany(p => p.Notifications)
				.HasForeignKey(d => d.UserId)
				.HasConstraintName("notification_user_id_fkey");
		});

		modelBuilder.Entity<Platform>(entity =>
		{
			entity.HasKey(e => e.Id).HasName("platform_pkey");

			entity.ToTable("platform", "playlistdb");

			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.LogoUrl).HasColumnName("logo_url");
			entity.Property(e => e.PlatformName)
				.HasMaxLength(40)
				.HasColumnName("platform_name");
            entity.Property(e => e.Checksum).HasColumnName("checksum");
            entity.Property(e => e.IgdbId).HasColumnName("igdb_id");
        });

		modelBuilder.Entity<PlatformGame>(entity =>
		{
			entity.HasKey(e => e.Id).HasName("platform_game_pkey");

			entity.ToTable("platform_game", "playlistdb");

			entity.HasIndex(e => e.PlatformId, "idx_platform_game_platform_id");

			entity.Property(e => e.Id).HasColumnName("id").UseIdentityColumn();
			entity.Property(e => e.GameId).HasColumnName("game_id");
			entity.Property(e => e.PlatformId).HasColumnName("platform_id");
			entity.Property(e => e.PlatformKey).HasColumnName("platform_key");
			entity.Property(e => e.PlatformUrl).HasColumnName("platform_url");

			entity.HasOne(d => d.Game).WithMany(p => p.PlatformGames)
				.HasForeignKey(d => d.GameId)
				.HasConstraintName("platform_game_game_id_fkey");

			entity.HasOne(d => d.Platform).WithMany(p => p.PlatformGames)
				.HasForeignKey(d => d.PlatformId)
				.HasConstraintName("platform_game_platform_id_fkey");
		});

		modelBuilder.Entity<ReviewLike>(entity =>
		{
			entity.HasKey(e => e.Id).HasName("review_like_pkey");

			entity.ToTable("review_like", "playlistdb");

			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.DateLiked).HasColumnName("date_liked");
			entity.Property(e => e.GameReviewId).HasColumnName("game_review_id");
			entity.Property(e => e.IsLike).HasColumnName("is_like");
			entity.Property(e => e.UserId).HasColumnName("user_id");

			entity.HasOne(d => d.GameReview).WithMany(p => p.ReviewLikes)
				.HasForeignKey(d => d.GameReviewId)
				.HasConstraintName("review_like_game_review_id_fkey");

			entity.HasOne(d => d.User).WithMany(p => p.ReviewLikes)
				.HasForeignKey(d => d.UserId)
				.HasConstraintName("review_like_user_id_fkey");
		});

		modelBuilder.Entity<UserAccount>(entity =>
		{
			entity.HasKey(e => e.Id).HasName("user_account_pkey");

			entity.ToTable("user_account", "playlistdb");

			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.AchievementsPrivate)
				.HasDefaultValue(false)
				.HasColumnName("achievements_private");
			entity.Property(e => e.AuthId).HasColumnName("auth_id");
			entity.Property(e => e.Bio).HasColumnName("bio");
			entity.Property(e => e.BioPrivate)
				.HasDefaultValue(false)
				.HasColumnName("bio_private");
			entity.Property(e => e.FavoriteGamesPrivate)
				.HasDefaultValue(false)
				.HasColumnName("favorite_games_private");
			entity.Property(e => e.FavoriteGenresPrivate)
				.HasDefaultValue(false)
				.HasColumnName("favorite_genres_private");
			entity.Property(e => e.GamertagsPrivate)
				.HasDefaultValue(false)
				.HasColumnName("gamertags_private");
			entity.Property(e => e.GoalPrivate)
				.HasDefaultValue(false)
				.HasColumnName("goal_private");
			entity.Property(e => e.Guid).HasColumnName("guid");
			entity.Property(e => e.JoinDate).HasColumnName("join_date");
			entity.Property(e => e.LibraryPrivate)
				.HasDefaultValue(false)
				.HasColumnName("library_private");
			entity.Property(e => e.NotifyOnAchievementDisliked)
				.HasDefaultValue(false)
				.HasColumnName("notify_on_achievement_disliked");
			entity.Property(e => e.NotifyOnAchievementLiked)
				.HasDefaultValue(false)
				.HasColumnName("notify_on_achievement_liked");
			entity.Property(e => e.NotifyOnFriendRequestAccepted)
				.HasDefaultValue(false)
				.HasColumnName("notify_on_friend_request_accepted");
			entity.Property(e => e.NotifyOnFriendRequestRecieved)
				.HasDefaultValue(false)
				.HasColumnName("notify_on_friend_request_recieved");
			entity.Property(e => e.NotifyOnGoalDisliked)
				.HasDefaultValue(false)
				.HasColumnName("notify_on_goal_disliked");
			entity.Property(e => e.NotifyOnGoalEndingSoon)
				.HasDefaultValue(false)
				.HasColumnName("notify_on_goal_ending_soon");
			entity.Property(e => e.NotifyOnGoalLiked)
				.HasDefaultValue(false)
				.HasColumnName("notify_on_goal_liked");
			entity.Property(e => e.NotifyOnReviewDisliked)
				.HasDefaultValue(false)
				.HasColumnName("notify_on_review_disliked");
			entity.Property(e => e.NotifyOnReviewLiked)
				.HasDefaultValue(false)
				.HasColumnName("notify_on_review_liked");
			entity.Property(e => e.PlaytimePrivate)
				.HasDefaultValue(false)
				.HasColumnName("playtime_private");
			entity.Property(e => e.ReviewsPrivate)
				.HasDefaultValue(false)
				.HasColumnName("reviews_private");
			entity.Property(e => e.Strike).HasColumnName("strike");
			entity.Property(e => e.UserImageId).HasColumnName("user_image_id");
			entity.Property(e => e.Username)
				.HasMaxLength(32)
				.HasColumnName("username");
			entity.Property(e => e.UsernamePrivate)
				.HasDefaultValue(false)
				.HasColumnName("username_private");
			entity.Property(e => e.Xp).HasColumnName("xp");
			entity.Property(e => e.XpPrivate)
				.HasDefaultValue(false)
				.HasColumnName("xp_private");
			entity.Property(e => e.Email).HasColumnName("email");
			entity.Property(e => e.TotalTrophies).HasColumnName("total_trophies");

			entity.HasOne(d => d.UserImage).WithMany(p => p.UserAccounts)
				.HasForeignKey(d => d.UserImageId)
				.OnDelete(DeleteBehavior.ClientSetNull)
				.HasConstraintName("user_account_user_image_id_fkey");
		});

		modelBuilder.Entity<UserAchievement>(entity =>
		{
			entity.HasKey(e => e.Id).HasName("user_achievement_pkey");

			entity.ToTable("user_achievement", "playlistdb");

			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.AchievementId).HasColumnName("achievement_id");
			entity.Property(e => e.DateAchieved).HasColumnName("date_achieved");
			entity.Property(e => e.IsSelfSubmitted).HasColumnName("is_self_submitted");
			entity.Property(e => e.UserId).HasColumnName("user_id");

			entity.HasOne(d => d.Achievement).WithMany(p => p.UserAchievements)
				.HasForeignKey(d => d.AchievementId)
				.OnDelete(DeleteBehavior.ClientSetNull)
				.HasConstraintName("user_achievement_achievement_id_fkey");

			entity.HasOne(d => d.User).WithMany(p => p.UserAchievements)
				.HasForeignKey(d => d.UserId)
				.HasConstraintName("user_achievement_user_id_fkey");
		});

		modelBuilder.Entity<UserGame>(entity =>
		{
			entity.HasKey(e => e.Id).HasName("user_game_pkey");

			entity.ToTable("user_game", "playlistdb");

			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.DateAdded).HasColumnName("date_added");
			entity.Property(e => e.GameRank).HasColumnName("game_rank");
			entity.Property(e => e.IsFavorite)
				.HasDefaultValue(false)
				.HasColumnName("is_favorite");
			entity.Property(e => e.PlatformGameId).HasColumnName("platform_game_id");
			entity.Property(e => e.TimePlayed).HasColumnName("time_played");
			entity.Property(e => e.UserId).HasColumnName("user_id");

			entity.HasOne(d => d.PlatformGame).WithMany(p => p.UserGames)
				.HasForeignKey(d => d.PlatformGameId)
				.HasConstraintName("user_game_platform_game_id_fkey");

			entity.HasOne(d => d.User).WithMany(p => p.UserGames)
				.HasForeignKey(d => d.UserId)
				.HasConstraintName("user_game_user_id_fkey");
		});

		modelBuilder.Entity<UserGenre>(entity =>
		{
			entity.HasKey(e => e.Id).HasName("user_genre_pkey");

			entity.ToTable("user_genre", "playlistdb");

			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.GenreId).HasColumnName("genre_id");
			entity.Property(e => e.UserId).HasColumnName("user_id");

			entity.HasOne(d => d.Genre).WithMany(p => p.UserGenres)
				.HasForeignKey(d => d.GenreId)
				.OnDelete(DeleteBehavior.ClientSetNull)
				.HasConstraintName("user_genre_genre_id_fkey");

			entity.HasOne(d => d.User).WithMany(p => p.UserGenres)
				.HasForeignKey(d => d.UserId)
				.OnDelete(DeleteBehavior.ClientSetNull)
				.HasConstraintName("user_genre_user_id_fkey");
		});

		modelBuilder.Entity<UserImage>(entity =>
		{
			entity.HasKey(e => e.Id).HasName("user_image_pkey");

			entity.ToTable("user_image", "playlistdb");

			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.Alt)
				.HasMaxLength(20)
				.HasColumnName("alt");
			entity.Property(e => e.Url).HasColumnName("url");
		});

		modelBuilder.Entity<UserPlatform>(entity =>
		{
			entity.HasKey(e => e.Id).HasName("user_platform_pkey");

			entity.ToTable("user_platform", "playlistdb");

			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.ExternalPlatformId)
				.HasMaxLength(100)
				.HasColumnName("external_platform_id");
			entity.Property(e => e.Gamertag)
				.HasMaxLength(40)
				.HasColumnName("gamertag");
			entity.Property(e => e.IsPublic).HasColumnName("is_public");
			entity.Property(e => e.PlatformId).HasColumnName("platform_id");
			entity.Property(e => e.UserId).HasColumnName("user_id");

			entity.HasOne(d => d.Platform).WithMany(p => p.UserPlatforms)
				.HasForeignKey(d => d.PlatformId)
				.OnDelete(DeleteBehavior.ClientSetNull)
				.HasConstraintName("user_platform_platform_id_fkey");

			entity.HasOne(d => d.User).WithMany(p => p.UserPlatforms)
				.HasForeignKey(d => d.UserId)
				.HasConstraintName("user_platform_user_id_fkey");
		});

		modelBuilder.Entity<UserTrophyAuditLog>(entity =>
		{
			entity.HasKey(e => e.Id).HasName("user_trophy_audit_log_pkey");

			entity.ToTable("user_trophy_audit_log", "playlistdb");

			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.TrophiesAfter).HasColumnName("trophies_after");
			entity.Property(e => e.TrophiesBefore).HasColumnName("trophies_before");
			entity.Property(e => e.AuditDate).HasColumnName("audit_date");
			entity.Property(e => e.UserId).HasColumnName("user_id");

			entity.HasOne(d => d.UserAccount).WithMany(p => p.UserTrophyAuditLogs)
				.HasForeignKey(d => d.UserId)
				.HasConstraintName("user_trophy_audit_log_user_id_fkey");
		});

		modelBuilder.Entity<UserGameAuditLog>(entity =>
		{
			entity.HasKey(e => e.Id).HasName("usergame_audit_log_pkey");

			entity.ToTable("usergame_audit_log", "playlistdb");

			entity.Property(e => e.Id).HasColumnName("id");
			entity.Property(e => e.MinutesBefore).HasColumnName("minutes_before");
			entity.Property(e => e.MinutesAfter).HasColumnName("minutes_after");
			entity.Property(e => e.AuditDate).HasColumnName("audit_date");
			entity.Property(e => e.UserId).HasColumnName("user_id");
			entity.Property(e => e.PlatformGameId).HasColumnName("platform_game_id");

			entity.HasOne(d => d.UserAccount).WithMany(p => p.UserGameAuditLogs)
				.HasForeignKey(d => d.UserId)
				.HasConstraintName("usergame_audit_log_user_id_fkey");
			entity.HasOne(d => d.PlatformGame).WithMany(p => p.UserGameAuditLogs)
				.HasForeignKey(d => d.PlatformGameId)
				.HasConstraintName("usergame_audit_log_platform_game_id_fkey");
		});

		base.OnModelCreating(modelBuilder);
	}

}
