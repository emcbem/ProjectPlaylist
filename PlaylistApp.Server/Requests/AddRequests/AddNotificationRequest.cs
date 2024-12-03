namespace PlaylistApp.Server.Requests.AddRequests;

public class AddNotificationRequest
{
    public int UserId { get; set; }
    public string? Title { get; set; }
    public string? Body { get; set; }
    public string? Url { get; set; }
}
