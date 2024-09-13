using PlaylistApp.Server.DTOs;

namespace PlaylistApp.Server.Services.Game;

public interface IGameService
{
    public Task<List<GameDTO>> GetAllGames();
}
