namespace PlaylistApp.Server.Requests.UpdateRequests;

public class UpdateUserPlatformRequest
{
    public int Id { get; set; } 
    public string? GamerTag { get; set; }
    public string? ExternalPlatformId { get; set; }
    public bool IsPublic { get; set; }  
}
