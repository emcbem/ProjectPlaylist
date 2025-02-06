using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs.CombinationData;
using PlaylistApp.Server.DTOs.SteamData;

namespace PlaylistApp.Server.Services.SteamServices;

public interface ISteamService
{
	public Task<OwnedGamesResponse> GetGamesFromUserBasedOffOfSteamId(string steamId);
	public Task<List<PlatformGame>> ConvertSteamToPlatformGames(OwnedGamesResponse jsonResponse);

	public Task<List<ItemAction>> FindGameInconsistenciesWithUserAccount(List<PlatformGame> matchingPlatformGames, List<SteamRawGame> steamGames, int userId);

	public Task AddMissingGamesToUserGames(OwnedGamesResponse response, int userId);
	public Task<List<ItemAction>> FixTimeDifferences(OwnedGamesResponse response, List<PlatformGame> matchingPlatformGames, List<SteamRawGame> steamGames, int userId);
	public string ExtractSteamIdFromUrl(string urlParams);
    public void AddSteamKeyToUser(string userId, string steamId);
}
