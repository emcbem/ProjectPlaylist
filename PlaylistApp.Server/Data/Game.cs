using System;
using System.Collections.Generic;

namespace PlaylistApp.Server.Data;

public partial class Game
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public string? CoverUrl { get; set; }

    public DateTime? PublishDate { get; set; }

    public string? AgeRating { get; set; }

    public int? IdgbId { get; set; }

    public int? Checksum { get; set; }

    public virtual ICollection<GameGenre> GameGenres { get; set; } = new List<GameGenre>();

    public virtual ICollection<GameReview> GameReviews { get; set; } = new List<GameReview>();

    public virtual ICollection<InvolvedCompany> InvolvedCompanies { get; set; } = new List<InvolvedCompany>();

    public virtual ICollection<ListGame> ListGames { get; set; } = new List<ListGame>();

    public virtual ICollection<PlatformGame> PlatformGames { get; set; } = new List<PlatformGame>();
}
