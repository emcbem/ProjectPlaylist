using System;
using System.Collections.Generic;

namespace PlaylistApp.Server.Data;

public partial class ListGame
{
    public int Id { get; set; }

    public int ListId { get; set; }

    public int GameId { get; set; }

    public DateTime DateAdded { get; set; }

    public virtual Game Game { get; set; } = null!;

    public virtual List List { get; set; } = null!;
}
