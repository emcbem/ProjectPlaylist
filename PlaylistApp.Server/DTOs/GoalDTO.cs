using PlaylistApp.Server.Data;

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

public static class GoalConverter
{
	public static GoalDTO ToDTO(this Goal goal)
	{
		if (goal is null)
		{
			return new GoalDTO();
		}

		return new GoalDTO()
		{
			Achievement = goal.Achievement.ToDTO(),
			DateAdded = goal.DateAdded,
			DateCompleted = goal.DateCompleted,
			DateToAchieve = goal.DateToAchieve,
			Dislikes = goal.GoalLikes.Where(x => x.IsLike == false).Count(),
			Likes = goal.GoalLikes.Where(x => x.IsLike == true).Count(),
			Id = goal.Id,
			IsCompleted = goal.IsComplete,
			IsCurrent = goal.IsCurrent,
			User = goal.User.ToDTO(),
		};
	}
}
