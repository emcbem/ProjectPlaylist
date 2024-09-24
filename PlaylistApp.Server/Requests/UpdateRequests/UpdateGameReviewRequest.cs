namespace PlaylistApp.Server.Requests.UpdateRequests;

public class UpdateGameReviewRequest
{
    public int GameReivewId { get; set; }   
    public int Rating { get; set; } 
    public string? ReviewText { get; set; }  
}
