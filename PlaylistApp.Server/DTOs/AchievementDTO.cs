namespace PlaylistApp.Server.DTOs;

public class AchievementDTO
{
    public int ID { get; set; }
    public PlatformGameDTO PlatformGame { get; set; } = new PlatformGameDTO();
    public string ImageURL { get; set; } = "";
    public string Name { get; set; } = "";
    public string Description { get; set; } = "";
    public int TotalTimeClaimed { get; set; }
}
