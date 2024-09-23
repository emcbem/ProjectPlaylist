namespace PlaylistApp.Server.DTOs;

public class GoalDTO
{
    public int Id { get; set; }
    public UserDTO? User { get; set; }
    public AchievementDTO? Achievement { get; set; }
    public DateTime? DateToAchieve { get; set; }
    public bool? IsCompleted { get; set; }
    public bool? IsCurrent { get; set; }
    public DateTime? DateCompleted { get; set; }
    public DateTime? DateAdded { get; set; }
    public int Likes { get; set; }
    public int Dislikes { get; set; }
}
