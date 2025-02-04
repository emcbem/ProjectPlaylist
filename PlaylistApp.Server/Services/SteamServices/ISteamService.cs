using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.DTOs.SteamData;

namespace PlaylistApp.Server.Services.SteamServices;

public interface ISteamService
{
    public void ConnectWithSteamUsingUserLogin();
    public Task<List<DTOs.SteamData.ActionItem>> GetGamesFromUserBasedOffOfSteamId(string steamId);
}
