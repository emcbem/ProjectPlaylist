using System;
using System.Collections.Generic;

namespace PlaylistApp.Server.Data;

public partial class Genre
{
    public int Id { get; set; }

    public string GenreName { get; set; } = null!;

    public string? Checksum { get; set; }

    public virtual ICollection<GameGenre> GameGenres { get; set; } = new List<GameGenre>();

    public virtual ICollection<UserGenre> UserGenres { get; set; } = new List<UserGenre>();
}
