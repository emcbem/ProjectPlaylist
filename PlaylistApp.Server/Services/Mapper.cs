using PlaylistApp.Server.DTOs.PlaystationData;
using PlaylistApp.Server.Services.Achievement;
using PlaylistApp.Server.Services.CompanyServices;
using PlaylistApp.Server.Services.EmailServices;
using PlaylistApp.Server.Services.FriendServices;
using PlaylistApp.Server.Services.Game;
using PlaylistApp.Server.Services.GenreServices;
using PlaylistApp.Server.Services.GoalLikeServices;
using PlaylistApp.Server.Services.GoalServices;
using PlaylistApp.Server.Services.IGDBSyncServices;
using PlaylistApp.Server.Services.IGDBSyncServices.DataGetters;
using PlaylistApp.Server.Services.IGDBSyncServices.Downloader;
using PlaylistApp.Server.Services.IGDBSyncServices.Parsers;
using PlaylistApp.Server.Services.ImageServices;
using PlaylistApp.Server.Services.ListServices;
using PlaylistApp.Server.Services.NotificationServices;
using PlaylistApp.Server.Services.PlatformGameServices;
using PlaylistApp.Server.Services.PlatformServices;
using PlaylistApp.Server.Services.PlaystationServices;
using PlaylistApp.Server.Services.ReviewLikeServices;
using PlaylistApp.Server.Services.SteamServices;
using PlaylistApp.Server.Services.SteamServices.SteamAchievementService;
using PlaylistApp.Server.Services.SteamServices.SteamAchievementService.SteamAchievementService;
using PlaylistApp.Server.Services.SteamServices.SteamGameService;
using PlaylistApp.Server.Services.UserAchievementLikeServices;
using PlaylistApp.Server.Services.UserAchievementServices;
using PlaylistApp.Server.Services.UserGameAuditLogServices;
using PlaylistApp.Server.Services.UserGameServices;
using PlaylistApp.Server.Services.UserPlatformServices;
using PlaylistApp.Server.Services.UserServices;

namespace PlaylistApp.Server.Services;

public static class Mapper
{
	public static void MapProjectPlaylistCoreServices(this WebApplicationBuilder builder)
	{
		builder.Services.AddSingleton<IAchievementService, AchievementService>();
		builder.Services.AddSingleton<ICompanyService, CompanyService>();
		builder.Services.AddSingleton<IEmailService, EmailService>();
		builder.Services.AddSingleton<IFriendService, FriendService>();
		builder.Services.AddSingleton<IGameService, GameService>();
		builder.Services.AddSingleton<IGenreService, GenreService>();
		builder.Services.AddSingleton<IGoalLikeService, GoalLikeService>();
		builder.Services.AddSingleton<IGoalService, GoalService>();
		builder.Services.AddSingleton<IImageService, ImageService>();
		builder.Services.AddSingleton<IListService, ListService>();
		builder.Services.AddSingleton<INotificationService, NotificationService>();
		builder.Services.AddSingleton<IPlatformGameService, PlatformGameService>();
		builder.Services.AddSingleton<IPlatformService, PlatformService>();
		builder.Services.AddSingleton<IReviewLikeService, ReviewLikeService>();
		builder.Services.AddSingleton<ISteamService, SteamService>();
        builder.Services.AddSingleton<ISteamAchievementService, SteamAchievementService2>();
        builder.Services.AddSingleton<ISteamOrchestrator, SteamOrchestrator>();
		builder.Services.AddSingleton<IUserAchievementLikeService, UserAchievementLikeService>();
		builder.Services.AddSingleton<IUserAchievementService, UserAchievementService>();
		builder.Services.AddSingleton<IUserGameService, UserGameService>();
		builder.Services.AddSingleton<IUserPlatformService, UserPlatformService>();
		builder.Services.AddSingleton<IUserService, UserService>();
		builder.Services.AddSingleton<IUserGameAuditLogService, UserGameAuditLogService>();

		builder.Services.AddSingleton<SyncOrchestrator>();
		builder.Services.AddSingleton<DifferenceHandler>();

    }
}
