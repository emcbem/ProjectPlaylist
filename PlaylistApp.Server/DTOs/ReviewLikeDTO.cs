using PlaylistApp.Server.Data;

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

public static class ReviewConverter
{
	public static ReviewLikeDTO ToDTO(this ReviewLike reviewLike)
	{
		if (reviewLike is null)
		{
			return new ReviewLikeDTO();
		}

		return new ReviewLikeDTO()
		{
			DateLiked = reviewLike.DateLiked,
			GameReviewId = reviewLike.GameReviewId,
			GameReviewed = reviewLike.GameReview.ToDTO(),
			Id = reviewLike.Id,
			IsLike = reviewLike.IsLike,
			UserId = reviewLike.User.Guid,
			User = reviewLike.User.ToDTO()
		};
	}
}

