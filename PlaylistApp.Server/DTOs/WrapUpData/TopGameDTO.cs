namespace PlaylistApp.Server.DTOs.WrapUpData;

public class TopGameDTO
{
    public string Title { get; set; } = "";
    public string CoverUrl { get; set; } = "";
    public double AllTimeHours { get; set; }
    public DateTime FirstTimePlayed { get; set; }
    public int TotalAchievements { get; set; }
    public int PlatformId { get; set; }
}
