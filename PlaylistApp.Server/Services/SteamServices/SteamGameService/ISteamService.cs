﻿using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs.CombinationData;
using PlaylistApp.Server.DTOs.SteamData.SteamGames;
using PlaylistApp.Server.Requests.UpdateRequests;

namespace PlaylistApp.Server.Services.SteamServices.SteamGameService;

public interface ISteamService
{
    public Task<OwnedGamesResponse> GetGamesFromUserBasedOffOfSteamId(string steamId);
    public Task<List<PlatformGame>> ConvertSteamToPlatformGames(OwnedGamesResponse jsonResponse);

    public Task<List<ItemAction>> FindGameInconsistenciesWithUserAccount(List<PlatformGame> matchingPlatformGames, List<SteamRawGame> steamGames, Guid userGuid);

    public Task AddMissingGamesToUserGames(OwnedGamesResponse response, Guid userGuid);
    public Task GatherTimeDifferences(OwnedGamesResponse response, List<PlatformGame> matchingPlatformGames, List<SteamRawGame> steamGames, Guid userGuid);
    public Task FixTimeDifferences(List<UpdateUserGameRequest> updateUserGAmeRequests, Guid userGuid);
    public string ExtractSteamIdFromUrl(string urlParams);
    public void AddSteamKeyToUser(string userId, string steamId);
    public Task AddSteamUsernameToUser(string userGuid, string steamId);
}
