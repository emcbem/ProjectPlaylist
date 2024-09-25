namespace PlaylistApp.Server.Requests.AddRequests;

public class AddUserPlatformRequest
{
    public int PlatformId { get; set; }
    public Guid UserId { get; set; }
    public string? GamerTag { get; set; }
    public string? ExternalPlatformId { get; set; } 
    public bool IsPublic { get; set; }
}
