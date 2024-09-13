using System;
using System.Collections.Generic;

namespace PlaylistApp.Server.Data;

public partial class GoalLike
{
    public int Id { get; set; }

    public int GoalId { get; set; }

    public int UserId { get; set; }

    public bool? IsLike { get; set; }

    public DateTime? DateLiked { get; set; }

    public virtual Goal Goal { get; set; } = null!;

    public virtual UserAccount User { get; set; } = null!;
}
