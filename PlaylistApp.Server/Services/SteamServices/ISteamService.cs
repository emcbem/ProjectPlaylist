using PlaylistApp.Server.DTOs.CombinationData;

namespace PlaylistApp.Server.Services.SteamServices;

public interface ISteamService
{
    public Task<List<ItemAction>> GetGamesFromUserBasedOffOfSteamId(string steamId);
    public string ExtractSteamIdFromUrl(string urlParams);
    public void AddSteamUserPlatform(string userId, string steamId);
}
