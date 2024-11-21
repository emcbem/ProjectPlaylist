using PlaylistApp.Server.Data;

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

public static class GoalLikeConverter
{
	public static GoalLikeDTO ToDTO(this GoalLike goalLike)
	{
		if (goalLike is null)
		{
			return new GoalLikeDTO();
		}

		return new GoalLikeDTO()
		{
			DateLiked = goalLike.DateLiked,
			GoalId = goalLike.GoalId,
			Id = goalLike.GoalId,
			IsLike = goalLike.IsLike,
			UserId = goalLike.User.Guid,
			Goal = goalLike.Goal.ToDTO(),
			User = goalLike.User.ToDTO(),
		};

	}
}
