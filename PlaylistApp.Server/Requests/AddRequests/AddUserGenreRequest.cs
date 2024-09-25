namespace PlaylistApp.Server.Requests.AddRequests;

public class AddUserGenreRequest
{
    public Guid UserId { get; set; }
    public int GenreId { get; set; }
}
