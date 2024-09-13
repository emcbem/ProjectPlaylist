using System;
using System.Collections.Generic;

namespace PlaylistApp.Server.Data;

public partial class Achievement
{
    public int Id { get; set; }

    public int PlatformGameId { get; set; }

    public string? ImageUrl { get; set; }

    public string AchievementName { get; set; } = null!;

    public string? AchievementDesc { get; set; }

    public virtual ICollection<Goal> Goals { get; set; } = new List<Goal>();

    public virtual PlatformGame PlatformGame { get; set; } = null!;

    public virtual ICollection<UserAchievement> UserAchievements { get; set; } = new List<UserAchievement>();
}
