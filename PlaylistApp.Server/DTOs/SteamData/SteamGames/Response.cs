namespace PlaylistApp.Server.DTOs.SteamData.SteamGames;

public class Response
{
    public int GameCount { get; set; }
    public List<SteamRawGame> Games { get; set; } = new();
}
