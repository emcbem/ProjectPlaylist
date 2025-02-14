using Newtonsoft.Json;

namespace PlaylistApp.Server.SteamData;


public class SteamGameAchievementDTO
{
    [JsonProperty("game")]
    public SteamGame? game { get; set; }
}

public class SteamGame
{
    public Availablegamestats? availableGameStats { get; set; }
}

public class Availablegamestats
{
    public Achievement[]? achievements { get; set; }
}

public class Achievement
{
    public string? name { get; set; }
    public int defaultvalue { get; set; }
    public string? displayName { get; set; }
    public int hidden { get; set; }
    public string? description { get; set; }
    public string? icon { get; set; }
    public string? icongray { get; set; }
}