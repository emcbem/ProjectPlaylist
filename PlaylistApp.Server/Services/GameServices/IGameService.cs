using PlaylistApp.Server.DTOs;

namespace PlaylistApp.Server.Services.Game;

public interface IGameService
{
    public Task<List<GameDTO>> GetAllGames();
    public Task<GameDTO> GetGameByID(int id);
    public Task<List<GameDTO>> GetGameByName(string name);
    public Task<GameDTO> GetGameByIGDB(int id);
}
