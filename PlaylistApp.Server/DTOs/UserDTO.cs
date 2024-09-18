using System.Runtime;

namespace PlaylistApp.Server.DTOs;

public class UserDTO
{
    public int Id { get; set; }
    public string Username { get; set; } = "";
    public string Bio { get; set; } = "";
    public int? Strikes { get; set; }
    public int? XP { get; set; }
    public DateTime CreationDate { get; set; }
    public string? AuthID { get; set; }
    public string? ProfileURL { get; set; }
    // TODO List<UserGameDTO>
    // TODO List<ListDTO>
    // TODO List<PlatformDTO>

}
