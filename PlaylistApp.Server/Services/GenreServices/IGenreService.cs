using PlaylistApp.Server.DTOs;

namespace PlaylistApp.Server.Services.GenreServices;

public interface IGenreService
{
    public Task<List<GenreDTO>> GetAllGenres();
    public Task<GenreDTO> GetGenreById(int GenreId);
    public Task<GenreDTO> GetGenreByName(string GenreName);
}
