using PsnApiWrapperNet.Model;

namespace PlaylistApp.Server.DTOs.PlaystationData;

public class PlaystationGameDTO
{
    public PlaystationGameDTO()
    {
        
    }

    public DateTime FirstPlayedDateTime { get; set; }
    public DateTime LastPlayedDateTime { get; set; }
    public int PlayCount { get; set; }
    public string? PlayDuration { get; set; }
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? ImageUrl { get; set; }
}
