using System;
using System.Collections.Generic;

namespace PlaylistApp.Server.Data;

public partial class UserAchievement
{
    public int Id { get; set; }

    public int AchievementId { get; set; }

    public int UserId { get; set; }

    public DateTime? DateAchieved { get; set; }

    public bool? IsSelfSubmitted { get; set; }

    public virtual Achievement Achievement { get; set; } = null!;

    public virtual ICollection<AchievementLike> AchievementLikes { get; set; } = new List<AchievementLike>();

    public virtual UserAccount User { get; set; } = null!;
}
