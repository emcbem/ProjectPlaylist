namespace PlaylistApp.Server.Requests.UpdateRequests;

public class UpdateUserRequest
{
    public Guid Guid { get; set; }
    public string? UserName { get; set; }
    public string? Bio { get; set; }
    public int Strikes { get; set; }
    public int XP { get; set; }
    public int UserImageID { get; set; }
}
