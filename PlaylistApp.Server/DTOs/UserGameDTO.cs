using System.Numerics;

namespace PlaylistApp.Server.DTOs;

public class UserGameDTO
{
    public int UserGameId { get; set; }
    public PlatformGameDTO? PlatformGame { get; set; }
    public long? TimePlayed { get; set; }
    public UserDTO? User { get; set; }
    public DateTime DateAdded { get; set; }
}
