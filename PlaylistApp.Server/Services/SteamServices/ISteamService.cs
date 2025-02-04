using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.DTOs.SteamData;

namespace PlaylistApp.Server.Services.SteamServices;

public interface ISteamService
{
    public Task<List<SteamActionItem>> GetGamesFromUserBasedOffOfSteamId(string steamId);
}
