namespace PlaylistApp.Server.DTOs.SteamData;

public class ActionItem
{
    public int PlatformGameId { get; set; }
    public string GameTitle { get; set; } = string.Empty;
    public int SteamPlayTime { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public string ProblemText { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty; 

}
