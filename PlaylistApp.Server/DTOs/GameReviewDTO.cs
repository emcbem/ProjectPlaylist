namespace PlaylistApp.Server.DTOs;

public class GameReviewDTO
{
    public DateOnly? LastEditDate { get; set; }
    public DateOnly PublishDate { get; set; }
    public GameDTO Game { get; set; } = new GameDTO();
    public UserDTO User { get; set; } = new UserDTO();
    public string? Text { get; set; }
    public int Id { get; set; }
    public int Likes { get; set; }
    public int Dislikes { get; set; }
    public int Rating { get; set; }
    public int? PlaytimeAtReview { get; set; }
	public int? PlaytimeAtModification { get; set; }

}