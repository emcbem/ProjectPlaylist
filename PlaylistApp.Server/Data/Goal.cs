using System;
using System.Collections.Generic;

namespace PlaylistApp.Server.Data;

public partial class Goal
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int AchievementId { get; set; }

    public DateTime? DateToAchieve { get; set; }

    public bool? IsComplete { get; set; }

    public bool? IsCurrent { get; set; }

    public DateTime? DateCompleted { get; set; }

    public DateTime? DateAdded { get; set; }

    public virtual Achievement Achievement { get; set; } = null!;

    public virtual ICollection<GoalLike> GoalLikes { get; set; } = new List<GoalLike>();

    public virtual UserAccount User { get; set; } = null!;
}
