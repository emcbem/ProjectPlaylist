using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs.CombinationData;
using PlaylistApp.Server.DTOs.SteamData;
using PlaylistApp.Server.DTOs.SteamData.SteamGames;
using PlaylistApp.Server.Requests.UpdateRequests;
using PlaylistApp.Server.Services.SteamServices.SteamAchievementService.SteamAchievementService;
using PlaylistApp.Server.Services.SteamServices.SteamGameService;

namespace PlaylistApp.Server.Services.SteamServices;

public class SteamOrchestrator : ISteamOrchestrator
{

    private readonly ISteamService steamService;
    private readonly ISteamAchievementService steamAchievementService;
    public SteamOrchestrator(ISteamService steamService, ISteamAchievementService steamAchievementService)
    {
        this.steamService = steamService;
        this.steamAchievementService = steamAchievementService;
    }

    public async Task<List<ItemAction>> CollectActionItemsFromSteam(SteamActionLogRequest steamActionLogRequest)
    {
        // step 1: get all games from steam (SteamRawGames)
        OwnedGamesResponse steamApiResponse = await steamService.GetGamesFromUserBasedOffOfSteamId(steamActionLogRequest.UserSteamId);

        // extract the games from the response
        List<SteamRawGame> steamGames = steamApiResponse.Response.Games;

        // step 2: Translate to PlatformGames (PlatformGames)
        List<PlatformGame> platformGamesFromSteam = await steamService.ConvertSteamToPlatformGames(steamApiResponse);

        // step 3: Check for game inconsistencies (games that the user doesn't have in their library but they show multiple platforms)
        List<ItemAction> itemActions = await steamService.FindGameInconsistenciesWithUserAccount(platformGamesFromSteam, steamGames, steamActionLogRequest.UserId);

        // step 4: Add games that don't have any problems to the user
        await steamService.AddMissingGamesToUserGames(steamApiResponse, steamActionLogRequest.UserId);

        // step 5: Find games user has but with different hours. 
        await steamService.GatherTimeDifferences(steamApiResponse, platformGamesFromSteam, steamGames, steamActionLogRequest.UserId);

        // step 6: of synced games, auto add achievements user hasn't added to playlist yet (under development)
        await steamAchievementService.AddMissingAchievementsToUser(steamActionLogRequest.UserId, steamActionLogRequest.UserSteamId);

        return itemActions;
    }
}
