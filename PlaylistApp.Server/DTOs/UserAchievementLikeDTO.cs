namespace PlaylistApp.Server.DTOs;

public class UserAchievementLikeDTO
{
    public int Id { get; set; }
    public int UserAchievementId { get; set; }
    public Guid UserId { get; set; }    
    public bool? IsLike { get; set; }    
    public DateTime? DateLiked { get; set; }
}
