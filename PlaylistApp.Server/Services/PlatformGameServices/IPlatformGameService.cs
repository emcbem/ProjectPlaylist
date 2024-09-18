using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.GetRequests;

namespace PlaylistApp.Server.Services.PlatformGameServices;

public interface IPlatformGameService
{
    public Task<List<PlatformGameDTO>> GetAllPlatformGames(PlatformGameRequest request);
}
