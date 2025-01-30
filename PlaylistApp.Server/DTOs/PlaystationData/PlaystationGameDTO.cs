namespace PlaylistApp.Server.DTOs.PlaystationData;

public class PlaystationGameDTO
{
    DateTime firstPlayedDateTime { get; set; }
    DateTime lastPlayedDateTime { get; set; }
    int playCount { get; set; }
    string? playDuration { get; set; }
    int id { get; set; }
    string? name { get; set; }
    string? imageUrl { get; set; }
}
