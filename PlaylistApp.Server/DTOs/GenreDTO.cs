using PlaylistApp.Server.Data;

namespace PlaylistApp.Server.DTOs;

public class GenreDTO
{
    public int id { get; set; }
    public string Name { get; set; } = "";
}

public static class GenreConverter
{
	public static GenreDTO ToDTO(this Genre genre)
	{
		if (genre is null)
		{
			return new GenreDTO();
		}

		return new GenreDTO()
		{
			id = genre.Id,
			Name = genre.GenreName,
		};
	}
}
