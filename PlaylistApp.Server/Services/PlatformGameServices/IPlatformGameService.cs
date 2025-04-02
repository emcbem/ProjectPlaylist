using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.GetRequests;

namespace PlaylistApp.Server.Services.PlatformGameServices;

public interface IPlatformGameService
{
    public Task<List<PlatformGameDTO>> GetAllPlatformGames(PlatformGameRequest request);
    public Task<List<PlatformGameDTO>> GetAllPlatformGamesByGame(int gameId);
    public Task<List<PlatformGameDTO>> GetAllPlatformGamesByExternalKey(string platformKey);
    public Task<PlatformGameDTO> GetPlatformGameById(int id);
}
