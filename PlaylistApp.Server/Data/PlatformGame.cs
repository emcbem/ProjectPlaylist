using System;
using System.Collections.Generic;

namespace PlaylistApp.Server.Data;

public partial class PlatformGame
{
    public int Id { get; set; }

    public int GameId { get; set; }

    public int PlatformId { get; set; }

    public string? PlatformKey { get; set; }

    public string? PlatformUrl { get; set; }

    public virtual ICollection<Achievement> Achievements { get; set; } = new List<Achievement>();

    public virtual Game Game { get; set; } = null!;

    public virtual Platform Platform { get; set; } = null!;

    public virtual ICollection<UserGame> UserGames { get; set; } = new List<UserGame>();
    public virtual ICollection<UserGameAuditLog> UserGameAuditLogs { get; set; } = new List<UserGameAuditLog>();
}
