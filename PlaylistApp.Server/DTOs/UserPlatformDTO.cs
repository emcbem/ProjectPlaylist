namespace PlaylistApp.Server.DTOs;

public class UserPlatformDTO
{
    public int Id { get; set; }
    public int PlatformId { get; set; }
    public Guid UserId { get; set; }
    public string? GamerTag { get; set; } 

}
