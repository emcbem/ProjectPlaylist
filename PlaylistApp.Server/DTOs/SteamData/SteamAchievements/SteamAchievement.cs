using System.Text.Json.Serialization;

namespace PlaylistApp.Server.DTOs.SteamData.SteamAchievements;

public class SteamAchievement
{
    public string Apiname { get; set; } = string.Empty;
    public int Achieved { get; set; }
    public long UnlockTime { get; set; }

}
