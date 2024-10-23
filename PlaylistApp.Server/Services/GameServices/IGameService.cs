using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.GetRequests;

namespace PlaylistApp.Server.Services.Game;

public interface IGameService
{
    public Task<List<GameDTO>> GetAllGames();
    public Task<GameDTO> GetGameByID(int id);
    public Task<List<GameDTO>> GetGameByName(string name);
    public Task<GameDTO> GetGameByIGDB(int id);
    public Task<List<GameDTO>> GetAllGamesByCompany(int companyId);
    public Task<List<GameDTO>> GetGamesByFilter(GetGamesRequest request);
}
