using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.UpdateRequests;
using PlaylistApp.Server.Services.NotificationServices;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class NotificationController : Controller
{
	INotificationService notificationService;

	public NotificationController(INotificationService notificationService)
	{
		this.notificationService = notificationService;
	}

    [Authorize]
    [HttpPost("/update")]
	public async Task<NotificationDTO?> UpdateNotification([FromBody] UpdateNotificationRequest request)
	{
		return await notificationService.UpdateNotification(request);
	}

    [Authorize]
    [HttpDelete("/delete/{id}")]
	public async Task<bool?> DeleteNotification(int id)
	{
		return await notificationService.DeleteNotification(id);
	}
}
