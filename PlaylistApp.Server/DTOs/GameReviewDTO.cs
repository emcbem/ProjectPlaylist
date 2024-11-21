using PlaylistApp.Server.Data;

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

public static class GameReviewConverter
{
	public static GameReviewDTO ToMinDTO(this GameReview gameReview)
	{
		if (gameReview is null)
		{
			return new GameReviewDTO();
		}

		return new GameReviewDTO()
		{
			Dislikes = gameReview.ReviewLikes.Where(x => x.IsLike == false).Count(),
			PublishDate = DateOnly.FromDateTime(gameReview.PublishDate),
			Likes = gameReview.ReviewLikes.Where(x => x.IsLike == true).Count(),
			Rating = gameReview.Rating,
			Text = gameReview.Review,
			LastEditDate = gameReview.LastEditDate.HasValue ? DateOnly.FromDateTime(gameReview.LastEditDate.Value) : null,
			User = gameReview.User.ToDTO(),
			Id = gameReview.Id,
			PlaytimeAtModification = gameReview.PlaytimeAtModification,
			PlaytimeAtReview = gameReview.PlaytimeAtReview
		};
	}

	public static GameReviewDTO ToDTO(this GameReview gameReview)
	{
		if (gameReview is null)
		{
			return new GameReviewDTO();
		}

		return new GameReviewDTO()
		{
			Dislikes = gameReview.ReviewLikes.Where(x => x.IsLike == false).Count(),
			PublishDate = DateOnly.FromDateTime(gameReview.PublishDate),
			Likes = gameReview.ReviewLikes.Where(x => x.IsLike == true).Count(),
			Rating = gameReview.Rating,
			Text = gameReview.Review,
			LastEditDate = gameReview.LastEditDate.HasValue ? DateOnly.FromDateTime(gameReview.LastEditDate.Value) : null,
			Game = gameReview.Game.ToDTO(),
			User = gameReview.User.ToDTO(),
			Id = gameReview.Id,
			PlaytimeAtModification = gameReview.PlaytimeAtModification,
			PlaytimeAtReview = gameReview.PlaytimeAtReview
		};
	}
}