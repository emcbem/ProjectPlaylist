using System;
using System.Collections.Generic;

namespace PlaylistApp.Server.Data;

public partial class UserGenre
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int GenreId { get; set; }

    public virtual Genre Genre { get; set; } = null!;

    public virtual UserAccount User { get; set; } = null!;
}
