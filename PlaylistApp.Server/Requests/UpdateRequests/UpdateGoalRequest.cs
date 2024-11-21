namespace PlaylistApp.Server.Requests.UpdateRequests;

public class UpdateGoalRequest
{
    public int Id { get; set; } 
    public DateTime DateToAchieve { get; set; }
    public bool IsCurrent { get; set; }
    public bool IsComplete { get; set; }
    public Guid? UserId { get; set; }
}
