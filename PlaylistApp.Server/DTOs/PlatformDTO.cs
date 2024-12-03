
using PlaylistApp.Server.Data;

namespace PlaylistApp.Server.DTOs;

public class PlatformDTO
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string logoURL { get; set; } = "";
}

public static class PlatformConverter
{
	public static PlatformDTO ToDTO(this Platform platform)
	{
		if (platform is null)
		{
			return new PlatformDTO();
		}

		return new PlatformDTO()
		{
			Id = platform.Id,
			Name = platform.PlatformName,
			logoURL = platform.LogoUrl,
		};
	}
}
