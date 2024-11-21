using PlaylistApp.Server.Data;

namespace PlaylistApp.Server.DTOs;



public class AchievementDTO
{
    public int ID { get; set; }
    public PlatformGameDTO PlatformGame { get; set; } = new PlatformGameDTO();
    public string ImageURL { get; set; } = "";
    public string Name { get; set; } = "";
    public string Description { get; set; } = "";
    public int TotalTimeClaimed { get; set; }
}

public static class AchievementConverter
{
	public static AchievementDTO ToDTO(this Achievement achievement)
	{
		if (achievement is null)
		{
			return new AchievementDTO();
		}

		return new AchievementDTO()
		{
			ID = achievement.Id,
			PlatformGame = achievement.PlatformGame.ToDTO(),
			ImageURL = achievement.ImageUrl ?? "",
			Name = achievement.AchievementName,
			Description = achievement.AchievementDesc ?? "",
			TotalTimeClaimed = achievement.UserAchievements.Count
		};
	}

	public static AchievementDTO ToMinDTO(this Achievement achievement)
	{
		if (achievement is null)
		{
			return new AchievementDTO();
		}

		return new AchievementDTO()
		{
			ID = achievement.Id,
			ImageURL = achievement.ImageUrl ?? "",
			Name = achievement.AchievementName,
			Description = achievement.AchievementDesc ?? "",
			TotalTimeClaimed = achievement.UserAchievements.Count
		};
	}
}
