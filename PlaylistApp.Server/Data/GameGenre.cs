using System;
using System.Collections.Generic;

namespace PlaylistApp.Server.Data;

public partial class GameGenre
{
    public int Id { get; set; }

    public int GenreId { get; set; }

    public int GameId { get; set; }

    public virtual Game Game { get; set; } = null!;

    public virtual Genre Genre { get; set; } = null!;
}
