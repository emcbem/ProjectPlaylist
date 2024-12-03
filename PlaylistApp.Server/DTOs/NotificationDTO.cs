using PlaylistApp.Server.Data;

namespace PlaylistApp.Server.DTOs;

public class NotificationDTO
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Body { get; set; }
    public DateTime? DateNotified { get; set; }
    public bool? UserNotified { get; set; }

    public string? Url { get; set; }
}

public static class NotificationConverter
{
    public static NotificationDTO ToDto(this Notification notification)
    {
        var notificationDto = new NotificationDTO()
        {
            Body = notification.Body,
            DateNotified = notification.DateNotified,
            Id = notification.Id,
            Title = notification.Title,
            UserNotified = notification.UserNotified,
            Url = notification.Url
        };
        return notificationDto;
    }
}
