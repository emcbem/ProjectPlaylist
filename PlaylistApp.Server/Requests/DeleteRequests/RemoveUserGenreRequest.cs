namespace PlaylistApp.Server.Requests.DeleteRequests;

public class RemoveUserGenreRequest
{
    public Guid UserId { get; set; }
    public int GenreId { get; set; }
}
