using PlaylistApp.Server.Data;

namespace PlaylistApp.Server.DTOs;

public class ListGameDTO
{
    public int Id { get; set; }
    public int ListId { get; set; }
    public GameDTO? Game { get; set; }
    public DateTime DateAdded { get; set; } 
}

public static class ListGameConverter
{
	public static ListGameDTO ToDTO(this ListGame listGame)
	{
		if (listGame is null)
		{
			return new ListGameDTO();
		}

		return new ListGameDTO()
		{
			DateAdded = listGame.DateAdded,
			Game = listGame.Game.ToDTO(),
			Id = listGame.Id,
			ListId = listGame.ListId,
		};
	}
}
