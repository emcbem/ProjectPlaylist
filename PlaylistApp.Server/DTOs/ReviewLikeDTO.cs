namespace PlaylistApp.Server.DTOs;

public class ReviewLikeDTO
{
    public int Id { get; set; }
    public Guid UserId { get; set; }
    public int GameReviewId { get; set; }
    public bool? IsLike { get; set; }
    public DateTime? DateLiked { get; set; }
    public GameReviewDTO? GameReviewed { get; set; } 
    public UserDTO? User { get; set; }
}
