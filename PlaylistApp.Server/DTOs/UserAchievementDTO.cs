using System.Diagnostics;

namespace PlaylistApp.Server.DTOs;

public class UserAchievementDTO
{
    public int Id { get; set; }
    public AchievementDTO Achievement { get; set; }
    public UserDTO User { get; set; }
    public bool? IsSelfSubmitted { get; set; }
    public DateTime? DateAchieved { get; set; }
    public int Likes { get; set; }
    public int Dislikes { get; set; }
}
