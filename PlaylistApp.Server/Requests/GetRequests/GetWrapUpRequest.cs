namespace PlaylistApp.Server.Requests.GetRequests;

public class GetWrapUpRequest
{
    public string UserId { get; set; } = "";
    public int Month { get; set; } = -1;
    public int Year { get; set; } = DateTime.Today.Year;
}
