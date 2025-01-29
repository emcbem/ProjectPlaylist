using System;
using System.Collections.Generic;
using PlaylistApp.Server.Interfaces;

namespace PlaylistApp.Server.Data;

public partial class Genre : IChecksum
{
    public int Id { get; set; }

    public string GenreName { get; set; } = null!;

    public string? Checksum { get; set; }

    public int? IgdbId { get; set; }
    public virtual ICollection<GameGenre> GameGenres { get; set; } = new List<GameGenre>();

    public virtual ICollection<UserGenre> UserGenres { get; set; } = new List<UserGenre>();
}
