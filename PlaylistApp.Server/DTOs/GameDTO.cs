using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.Data;

namespace PlaylistApp.Server.DTOs;

public class GameDTO 
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public string? CoverUrl { get; set; }
    public DateTime? PublishDate { get; set; }
    public string? AgeRating { get; set; }
    public int? IdgbId { get; set; }
    public List<CompanyDTO>? Companies { get; set; }
    public List<PlatformGameDTO>? Platforms { get; set; }
    public List<GenreDTO>? Genres { get; set; }
    public List<GameReviewDTO>? Reviews { get; set; }
    public long? HoursPlayed { get; set; }
    public int? TotalOwned { get; set; }
}

public static class GameConverter
{
	public static GameDTO ToDTO(this Game game)
	{
		if (game is null)
		{
			return new GameDTO();
		}

		return new GameDTO()
		{
			Id = game.Id,
			Title = game.Title,
			PublishDate = game.PublishDate,
			AgeRating = game.AgeRating,
			CoverUrl = game.CoverUrl,
			Description = game.Description,
			IdgbId = game.IgdbId,
			Companies = game.InvolvedCompanies.Select(x => x.Company.ToDTO()).ToList(),
			HoursPlayed = game.PlatformGames.Sum(x => x.UserGames.Sum(y => y.TimePlayed)),
			TotalOwned = game.PlatformGames.Sum(x => x.UserGames.Count),
			Platforms = game.PlatformGames.Select(x => x.ToMinDTO()).ToList(),
			Genres = game.GameGenres.Select(x => x.Genre.ToDTO()).ToList(),
			Reviews = game.GameReviews.Select(x => x.ToMinDTO()).ToList(),
		};
	}
}
