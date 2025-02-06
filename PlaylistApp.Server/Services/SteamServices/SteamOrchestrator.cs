using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs.CombinationData;
using PlaylistApp.Server.DTOs.SteamData;
using PlaylistApp.Server.Services.UserPlatformServices;

namespace PlaylistApp.Server.Services.SteamServices;

public class SteamOrchestrator : ISteamOrchestrator
{

	private readonly ISteamService steamService;
	public SteamOrchestrator(ISteamService steamService)
	{
		this.steamService = steamService;
	}

	public async Task<List<ItemAction>> CallAllTheMethods(string steamId, int userId)
	{
		// step 1: get all games from steam (SteamRawGames)
		OwnedGamesResponse steamApiResponse = await steamService.GetGamesFromUserBasedOffOfSteamId(steamId);

		// extract the games from the response
		List<SteamRawGame> steamGames = steamApiResponse.Response.Games;

		// step 2: Translate to PlatformGames (PlatformGames)
		List<PlatformGame> platformGamesFromSteam = await steamService.ConvertSteamToPlatformGames(steamApiResponse);

		// step 3: Check for game inconsistencies (games that the user doesn't have in their library but they show multiple platforms)
		List<ItemAction> itemActions = await steamService.FindGameInconsistenciesWithUserAccount(platformGamesFromSteam, steamGames, userId); // Todo change this

		// step 4: Add games that don't have any problems to the user
		await steamService.AddMissingGamesToUserGames(steamApiResponse, 5); // TODO change this

		// step 5: Find games user has but with different hours. 


		// return action log!
		return itemActions;
	}
}
