using PlaylistApp.Server.Data;

namespace PlaylistApp.Server.DTOs;

public class PlatformGameDTO
{
    public int id { get; set; }
    public GameDTO Game { get; set; } = new GameDTO();
    public PlatformDTO Platform { get; set; } = new PlatformDTO();
    public List<AchievementDTO>? Achievements { get; set; }
    public string PlatformURL { get; set; } = "";
    public string PlatformKey { get; set; } = "";
}

public static class PlatformGameConverter
{
	public static PlatformGameDTO ToMinDTO(this PlatformGame platformGame)
	{
		if (platformGame is null)
		{
			return new PlatformGameDTO();
		}

		return new PlatformGameDTO()
		{
			id = platformGame.Id,
			PlatformKey = platformGame.PlatformKey ?? "",
			Platform = platformGame.Platform.ToDTO(),
			PlatformURL = platformGame.PlatformUrl ?? "",
			Achievements = platformGame.Achievements.Select(x => x.ToMinDTO()).ToList()
		};
	}
	public static PlatformGameDTO ToDTO(this PlatformGame platformGame)
	{
		if (platformGame is null)
		{
			return new PlatformGameDTO();
		}

		return new PlatformGameDTO()
		{
			id = platformGame.Id,
			Game = platformGame.Game.ToDTO(),
			PlatformKey = platformGame.PlatformKey ?? "",
			Platform = platformGame.Platform.ToDTO(),
			PlatformURL = platformGame.PlatformUrl ?? "",
			Achievements = platformGame.Achievements.Select(x => x.ToMinDTO()).ToList()
		};
	}
}
