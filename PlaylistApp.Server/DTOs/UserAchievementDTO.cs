using PlaylistApp.Server.Data;
using System.Diagnostics;

namespace PlaylistApp.Server.DTOs;

public class UserAchievementDTO
{
    public int Id { get; set; }
    public AchievementDTO? Achievement { get; set; }
    public UserDTO? User { get; set; }
    public bool? IsSelfSubmitted { get; set; }
    public DateTime? DateAchieved { get; set; }
    public int Likes { get; set; }
    public int Dislikes { get; set; }
}

public static class UserAchievementConverter
{
	public static UserAchievementDTO ToDTO(this UserAchievement userAchievement)
	{
		if (userAchievement is null)
		{
			return new UserAchievementDTO();
		}

		return new UserAchievementDTO()
		{
			Id = userAchievement.Id,
			Achievement = userAchievement.Achievement.ToDTO(),
			User = userAchievement.User.ToDTO(),
			IsSelfSubmitted = userAchievement.IsSelfSubmitted,
			DateAchieved = userAchievement.DateAchieved,
			Likes = userAchievement.AchievementLikes.Where(x => x.IsLike == true).Count(),
			Dislikes = userAchievement.AchievementLikes.Where(x => x.IsLike == false).Count(),
		};
	}
}
