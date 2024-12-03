using PlaylistApp.Server.Data;

namespace PlaylistApp.Server.Services.EmailServices;

public interface IEmailService
{
	public bool SendEmailFromNotification(Notification notification, UserAccount user);
}
