using System;
using System.Collections.Generic;

namespace PlaylistApp.Server.Data;

public partial class AchievementLike
{
    public int Id { get; set; }

    public int UserAchievementId { get; set; }

    public int UserId { get; set; }

    public bool? IsLike { get; set; }

    public DateTime? DateLiked { get; set; }

    public virtual UserAccount User { get; set; } = null!;

    public virtual UserAchievement UserAchievement { get; set; } = null!;
}
