using PlaylistApp.Server.Data;

namespace PlaylistApp.Server.DTOs;

public class UserPlatformDTO
{
    public int Id { get; set; }
    public int PlatformId { get; set; }
    public Guid UserId { get; set; }
    public string? GamerTag { get; set; } 
	public string? ExternalPlatformId { get; set; }
}

public static class UserPlatformConverter
{
	public static UserPlatformDTO ToDTO(this UserPlatform userPlatform)
	{
		if (userPlatform is null)
		{
			return new UserPlatformDTO();
		}

		return new UserPlatformDTO()
		{
			GamerTag = userPlatform.Gamertag,
			Id = userPlatform.Id,
			PlatformId = userPlatform.PlatformId,
			UserId = userPlatform.User.Guid,
			ExternalPlatformId = userPlatform.ExternalPlatformId,
		};
	}
}
