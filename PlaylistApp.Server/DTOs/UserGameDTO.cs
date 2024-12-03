using PlaylistApp.Server.Data;
using System.Numerics;

namespace PlaylistApp.Server.DTOs;

public class UserGameDTO
{
    public int UserGameId { get; set; }
    public PlatformGameDTO? PlatformGame { get; set; }
    public long? TimePlayed { get; set; }
    public UserDTO? User { get; set; }
    public DateTime DateAdded { get; set; }
}

public static class UserGameConverter
{
	public static UserGameDTO ToDTO(this UserGame userGame)
	{
		if (userGame is null)
		{
			return new UserGameDTO();
		}

		return new UserGameDTO()
		{
			PlatformGame = userGame.PlatformGame.ToDTO(),
			User = userGame.User.ToDTO(),
			TimePlayed = userGame.TimePlayed,
			UserGameId = userGame.Id,
			DateAdded = userGame.DateAdded,
		};
	}
	public static UserGameDTO ToDTONoUser(this UserGame userGame)
	{
		if (userGame is null)
		{
			return new UserGameDTO();
		}

		return new UserGameDTO()
		{
			PlatformGame = userGame.PlatformGame.ToDTO(),
			User = null,
			TimePlayed = userGame.TimePlayed,
			UserGameId = userGame.Id,
			DateAdded = userGame.DateAdded,
		};
	}
}