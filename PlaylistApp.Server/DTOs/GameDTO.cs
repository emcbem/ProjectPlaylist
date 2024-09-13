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
    //Add list of companies
    public int? HoursPlayed { get; set; }
    public int? TotalOwned { get; set; }

}
