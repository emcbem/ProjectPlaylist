namespace PlaylistApp.Server.Requests.AddRequests;

public class AddListRequest
{
    public Guid UserId { get; set; }
    public string Name { get; set; } = "Default Name";
    public bool IsPublic { get; set; }
    public DateTime CreationDate { get; set; }
}
