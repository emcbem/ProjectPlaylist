namespace PlaylistApp.Server.DTOs.SteamData;

public class SteamActionLogRequest
{
	public Guid UserId { get; set; }
	public string UserSteamId { get; set; } = string.Empty;
}
