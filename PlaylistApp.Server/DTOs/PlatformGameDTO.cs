namespace PlaylistApp.Server.DTOs;

public class PlatformGameDTO
{
    public int id { get; set; }
    public GameDTO Game { get; set; } = new GameDTO();
    public PlatformDTO Platform { get; set; } = new PlatformDTO();
    public List<AchievementDTO>? Achievements { get; set; }
    public string PlatformURL { get; set; } = "";
    public string PlatformKey { get; set; } = "";
}
