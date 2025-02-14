using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PlaylistApp.Server.Data;

public partial class Achievement
{
    [Key]
    public int Id { get; set; }

    public int PlatformGameId { get; set; }

    public string? ImageUrl { get; set; }

    public string AchievementName { get; set; } = null!;

    public string? AchievementDesc { get; set; }

    public string? ExternalId { get; set; }

    public virtual ICollection<Goal> Goals { get; set; } = new List<Goal>();

    public virtual PlatformGame PlatformGame { get; set; } = null!;

    public virtual ICollection<UserAchievement> UserAchievements { get; set; } = new List<UserAchievement>();

    public Achievement()
    {
        
    }

    public Achievement(string imageUrl, string name, string description)
    {
        this.ImageUrl = imageUrl;
        this.AchievementName = name;
        this.AchievementDesc = description;
    }
}
