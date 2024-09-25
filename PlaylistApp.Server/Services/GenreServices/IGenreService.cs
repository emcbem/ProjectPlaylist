using PlaylistApp.Server.DTOs;

namespace PlaylistApp.Server.Services.GenreServices;

public interface IGenreService
{
    public Task<List<GenreDTO>> GetAll();
    public Task<GenreDTO> GetById(int GenreId);
    public Task<List<GenreDTO>> GetByname(string GenreName);
}
