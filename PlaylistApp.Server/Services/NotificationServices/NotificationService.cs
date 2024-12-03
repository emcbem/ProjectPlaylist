using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;

namespace PlaylistApp.Server.Services.NotificationServices;

public class NotificationService : INotificationService
{
	private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;

	public NotificationService(IDbContextFactory<PlaylistDbContext> dbContextFactory)
    {
		this.dbContextFactory = dbContextFactory;
	}

	public async Task<bool> CreateNotification(AddNotificationRequest request)
	{
		using var context = await dbContextFactory.CreateDbContextAsync();

		var notificationToCreate = new Notification
		{
			Body = request.Body,
			DateNotified = DateTime.UtcNow,
			Title = request.Title,
			UserId = request.UserId,
			UserNotified = false,
			Url = request.Url
		};

		context.Notifications.Add(notificationToCreate);

		return true;
	}


	public async Task<bool> DeleteNotification(int notificationId)
	{	
		using var context = await dbContextFactory.CreateDbContextAsync();

		Notification? notificationToDelete = await context.Notifications.Where(x => x.Id == notificationId).FirstOrDefaultAsync();

		if (notificationToDelete == null) {
			return false;
		}

		context.Notifications.Remove(notificationToDelete);
		await context.SaveChangesAsync();

		return true;
	}

	public async Task<NotificationDTO?> UpdateNotification(UpdateNotificationRequest request)
	{
		using var context = await dbContextFactory.CreateDbContextAsync();

		var notificationToUpdate = await context.Notifications.Where(x => x.Id == request.NotificationId).FirstOrDefaultAsync();

		if(notificationToUpdate is null)
		{
			return null;
		}

		notificationToUpdate.UserNotified = request.UserNotified;

		context.Notifications.Update(notificationToUpdate);

		await context.SaveChangesAsync();

		return notificationToUpdate.ToDto();
	}
}
