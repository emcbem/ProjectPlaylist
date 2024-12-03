using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;

namespace PlaylistApp.Server.Services.NotificationServices;

public interface INotificationService
{
	public Task<bool> DeleteNotification(int notificationId);
	public Task<NotificationDTO?> UpdateNotification(UpdateNotificationRequest request);
	public Task<bool> CreateNotification(AddNotificationRequest request);
}
