using Org.BouncyCastle.Bcpg.OpenPgp;

namespace PlaylistApp.Server.DTOs.PlaystationData;

public class PlaystationContext
{
    public string? AccessToken { get; set; }
    public string? TokenType { get; set; }
    public int ExpiresIn { get; set; }
    public string? Scope { get; set; }
    public string? IdToken { get; set; }
    public string? RefreshToken { get; set; }   
}
