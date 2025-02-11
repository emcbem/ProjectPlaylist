namespace PlaylistApp.Server.DTOs.SteamData.SteamAchievements;

public class PlayerStats
{
    public string SteamID { get; set; } = string.Empty;
    public string GameName { get; set; } = string.Empty;
    public List<SteamAchievement> Achievements { get; set; } = new List<SteamAchievement>();
}