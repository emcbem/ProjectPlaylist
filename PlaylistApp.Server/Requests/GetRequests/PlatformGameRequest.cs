namespace PlaylistApp.Server.Requests.GetRequests;

public class PlatformGameRequest
{
    public int PlatformID { get; set; }
    public string Filter { get; set; } = "";
}
