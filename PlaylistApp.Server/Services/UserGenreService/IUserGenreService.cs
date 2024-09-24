using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.DeleteRequests;

namespace PlaylistApp.Server.Services.UserGenreService;

public interface IUserGenreService
{
    public Task<List<GenreDTO>> GetAllByUser(Guid id);
    public Task<bool> AddUserGenre(AddUserGenreRequest request);
    public Task<bool> DeleteUserGenre(RemoveUserGenreRequest request);
}
