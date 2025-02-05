using PlaylistApp.Server.DTOs.SteamData;

namespace PlaylistApp.Server.Services.SteamServices;

public interface ISteamService
{
    public Task<List<SteamActionItem>> GetGamesFromUserBasedOffOfSteamId(string steamId);
    public string ExtractSteamIdFromUrl(string urlParams);
    public void AddSteamUserPlatform(string userId, string steamId);
}
