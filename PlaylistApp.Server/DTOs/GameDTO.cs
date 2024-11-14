using Microsoft.AspNetCore.Mvc;

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
