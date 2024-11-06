namespace PlaylistApp.Server.DTOs;

public class GoalLikeDTO
{
    public int Id { get; set; }
    public int GoalId { get; set; }
    public Guid UserId { get; set; }
    public bool? IsLike { get; set; }
    public DateTime? DateLiked { get; set; }
    public GoalDTO? Goal { get; set; }
    public UserDTO? User { get; set; }
}
