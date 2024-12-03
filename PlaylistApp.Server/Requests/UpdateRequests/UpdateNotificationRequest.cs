namespace PlaylistApp.Server.Requests.UpdateRequests;

public class UpdateNotificationRequest
{
    public int NotificationId { get; set; }
    public bool UserNotified { get; set; }
}
