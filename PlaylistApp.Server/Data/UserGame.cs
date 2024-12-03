using System;
using System.Collections.Generic;

namespace PlaylistApp.Server.Data;

public partial class UserGame
{
	public int Id { get; set; }

	public int UserId { get; set; }

	public int PlatformGameId { get; set; }

	public DateTime DateAdded { get; set; }

	public long? TimePlayed { get; set; }

	public bool? IsFavorite { get; set; }

	public int? GameRank { get; set; }

	public virtual PlatformGame PlatformGame { get; set; } = null!;

	public virtual UserAccount User { get; set; } = null!;
}
