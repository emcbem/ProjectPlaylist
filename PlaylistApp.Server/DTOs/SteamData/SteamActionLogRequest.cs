namespace PlaylistApp.Server.DTOs.SteamData;

public class SteamActionLogRequest
{
	public int UserId { get; set; }
	public string UserSteamId { get; set; } = string.Empty;
}
