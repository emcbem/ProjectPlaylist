namespace PlaylistApp.Server.Requests.AddRequests;

public class AddGameReviewRequest
{
    public int GameId { get; set; }
    public int UserId { get; set; }
    public int Rating { get; set; }
    public string? Text { get; set; }
}