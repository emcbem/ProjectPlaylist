namespace PlaylistApp.Server.DTOs.SteamData;

public class UserSteamGame
{
    public int PlatformGameId { get; set; }
    public string GameTitle { get; set; } = string.Empty;
    public int SteamPlayTime { get; set; }
}
