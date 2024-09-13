using System;
using System.Collections.Generic;

namespace PlaylistApp.Server.Data;

public partial class GameReview
{
    public int Id { get; set; }

    public int GameId { get; set; }

    public int UserId { get; set; }

    public string? Review { get; set; }

    public DateTime PublishDate { get; set; }

    public DateTime? LastEditDate { get; set; }

    public int Rating { get; set; }

    public virtual Game Game { get; set; } = null!;

    public virtual ICollection<ReviewLike> ReviewLikes { get; set; } = new List<ReviewLike>();

    public virtual UserAccount User { get; set; } = null!;
}
