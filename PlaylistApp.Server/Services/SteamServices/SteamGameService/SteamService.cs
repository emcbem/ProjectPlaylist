﻿using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs.CombinationData;
using PlaylistApp.Server.DTOs.SteamData.SteamGames;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;
using PlaylistApp.Server.Services.UserPlatformServices;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace PlaylistApp.Server.Services.SteamServices.SteamGameService;

public class SteamService : ISteamService
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;
    private readonly HttpClient client;
    private readonly IConfiguration config;
    private readonly IUserPlatformService userPlatformService;
    private readonly string steamKey;

    public SteamService(IDbContextFactory<PlaylistDbContext> dbContextFactory,
        HttpClient client,
        IConfiguration config,
        IUserPlatformService userPlatformService)
    {
        this.dbContextFactory = dbContextFactory;
        this.client = client;
        this.config = config;
        this.userPlatformService = userPlatformService;
        this.steamKey = config["steamkey"] ?? throw new Exception("No Steam Key provided in configuration.");
    }

    public List<ItemAction> SteamActions { get; set; } = new();

    public async Task<OwnedGamesResponse> GetGamesFromUserBasedOffOfSteamId(string steamId)
    {
        string url = $"https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key={steamKey}&steamid={steamId}&format=json";

        try
        {
            HttpResponseMessage response = await client.GetAsync(url);
            response.EnsureSuccessStatusCode();

            OwnedGamesResponse jsonResponse = await response.Content.ReadFromJsonAsync<OwnedGamesResponse>() ?? new OwnedGamesResponse();

            if (jsonResponse == null)
            {
                throw new Exception("Something went wrong parsing the data from Steam. Is the account private?");
            }

            return jsonResponse;
        }
        catch (HttpRequestException e)
        {
            Console.WriteLine("An Error occured when fetching games from Steam: " + e.Message);
            throw new Exception();
        }
    }


    public async Task<List<PlatformGame>> ConvertSteamToPlatformGames(OwnedGamesResponse jsonResponse)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        List<SteamRawGame> steamGames = jsonResponse.Response.Games;

        HashSet<int> appIds = new HashSet<int>(steamGames.Select(g => g.AppId));
        Dictionary<int, int> playtimeDict = steamGames.ToDictionary(g => g.AppId, g => g.PlaytimeForever);

        List<PlatformGame> matchingPlatformGames = await context.PlatformGames
            .Where(pg => appIds.Any(appId => appId.ToString() == pg.PlatformKey))
            .Include(g => g.Game)
            .Include(g => g.UserGames)
            .Include(p => p.Platform)
            .ToListAsync();

        return matchingPlatformGames;
    }

    public async Task<List<ItemAction>> FindGameInconsistenciesWithUserAccount(List<PlatformGame> matchingPlatformGames, List<SteamRawGame> steamGames, Guid userId)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var duplicatePlatformKeys = matchingPlatformGames
            .GroupBy(pg => pg.PlatformKey)
            .Where(g => g.Count() > 1)
            .Select(g => g.Key)
            .ToList();

        var gamesWithDuplicatePlatformKeys = matchingPlatformGames
            .Where(pg => duplicatePlatformKeys.Contains(pg.PlatformKey))
            .ToList();

        List<UserGame> usersGames = context.UserGames
           .Where(x => x.User.Guid == userId)
           .Include(g => g.PlatformGame)
           .ThenInclude(g => g.Game)
           .Include(g => g.User)
           .ToList();
        HashSet<int> userGameIds = new(usersGames.Select(x => x.PlatformGameId));


        List<ItemAction> actionsToSend = new();

        int counter = 0;
        string previousGame = "";

        List<List<PlatformGame>> pgsGroupedByGame = gamesWithDuplicatePlatformKeys
            .GroupBy(x => x.GameId)
            .Select(group => group.ToList())
            .ToList();

        foreach (List<PlatformGame> pgGroup in pgsGroupedByGame)
        {
            ItemAction actionToAdd = new();
            actionToAdd.ErrorType = $"We found multiple platforms for {pgGroup.First().Game.Title}";

            foreach (var pg in pgGroup)
            {
                var steamGame = steamGames.Where(x => x.AppId.ToString() == pg.PlatformKey).FirstOrDefault();
                var userGameFromPlatform = usersGames.Where(x => x.PlatformGame.GameId == pg.GameId).ToList();

                if (steamGame != null && !userGameFromPlatform.Any()) // if the user doesn't already have this game
                {

                    if (pg.Game.Title != previousGame)
                    {
                        counter++;
                    }
                    previousGame = pg.Game.Title;

                    actionToAdd.ItemOptions.Add(new ItemOption()
                    {
                        ErrorText = pg.Platform.PlatformName,
                        ResolveUrl = $"/action/platforms/?hours={steamGame.PlaytimeForever}&pgid={pg.Id}&user={userId}",
                        GameTitle = pg.Game.Title,
                        Hours = steamGame.PlaytimeForever,
                    });

                }
            }
            actionsToSend.Add(actionToAdd);
        }

        return actionsToSend;
    }

    public async Task AddMissingGamesToUserGames(OwnedGamesResponse response, Guid userGuid)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        List<SteamRawGame> steamGames = response.Response.Games;

        steamGames = steamGames.GroupBy(x => x.AppId).SelectMany(g => g).ToList();

        List<PlatformGame> platformGamesFromSteam = await ConvertSteamToPlatformGames(response);

        int userId = await context.UserAccounts.Where(x => x.Guid == userGuid).Select(x => x.Id).FirstOrDefaultAsync();

        List<UserGame> usersGames = context.UserGames
            .Where(x => x.UserId == userId)
            .Include(g => g.PlatformGame)
            .ThenInclude(g => g.Game)
            .ToList();
        HashSet<int> userGameIds = new HashSet<int>(usersGames.Select(x => x.PlatformGameId));

        var duplicatePlatformKeys = platformGamesFromSteam
            .GroupBy(pg => pg.PlatformKey)
            .Where(g => g.Count() > 1)
            .Select(g => g.Key)
            .ToList();

        var gamesWithSamePlatformKeys = platformGamesFromSteam
            .Where(pg => duplicatePlatformKeys.Contains(pg.PlatformKey))
            .ToList();
        HashSet<int> idsWithSamePlatformKeys = new HashSet<int>(gamesWithSamePlatformKeys.Select(x => x.Id));

        List<PlatformGame> gamesThatTheUserDoesntAlreadyHave = new List<PlatformGame>();
        foreach (PlatformGame pg in platformGamesFromSteam)
        {
            if (!userGameIds.Contains(pg.Id))    // if they don't have the platform game
            {
                gamesThatTheUserDoesntAlreadyHave.Add(pg);
                SteamRawGame? steamGame = steamGames.Where(x => x.AppId.ToString() == pg.PlatformKey).FirstOrDefault();

                if (steamGame is not null && !idsWithSamePlatformKeys.Contains(pg.Id))
                {
                    UserGame ug = new UserGame()
                    {
                        UserId = userId,
                        PlatformGameId = pg.Id,
                        DateAdded = DateTime.UtcNow,
                        TimePlayed = steamGame.PlaytimeForever,
                    };
                    context.UserGames.Add(ug);
                }
            }
        }
        await context.SaveChangesAsync();
    }

    public async Task<List<ItemAction>> FixTimeDifferences(OwnedGamesResponse response, List<PlatformGame> matchingPlatformGames, List<SteamRawGame> steamGames, Guid userGuid)
    {

        var duplicatePlatformKeys = matchingPlatformGames
            .GroupBy(pg => pg.PlatformKey)
            .Where(g => g.Count() > 1)
            .Select(g => g.Key)
            .ToList();

        List<PlatformGame> gamesWithSamePlatformKeys = matchingPlatformGames
            .Where(pg => duplicatePlatformKeys.Contains(pg.PlatformKey))
            .ToList();

        matchingPlatformGames = matchingPlatformGames.Where(x => !gamesWithSamePlatformKeys.Contains(x)).ToList();

        using var context = await dbContextFactory.CreateDbContextAsync();

        int userId = await context.UserAccounts.Where(x => x.Guid == userGuid).Select(x => x.Id).FirstOrDefaultAsync();
        List<UserGame> usersGames = context.UserGames
            .Where(x => x.UserId == userId)
            .Include(g => g.PlatformGame)
            .ThenInclude(g => g.Game)
            .ToList();

        HashSet<int> userGameIds = new HashSet<int>(usersGames.Select(x => x.PlatformGameId));
        int counter = 0;

        List<ItemAction> actionsToSend = new();

        foreach (PlatformGame pg in matchingPlatformGames)
        {
            UserGame? ug = usersGames.Where(x => x.PlatformGameId == pg.Id && x.UserId == userId).FirstOrDefault();
            SteamRawGame? steamGame = steamGames.Where(x => x.AppId.ToString() == pg.PlatformKey).FirstOrDefault();

            if (ug!.TimePlayed != steamGame?.PlaytimeForever)
            {
                counter++;

                ItemAction action = new ItemAction()
                {
                    ErrorType = "We found a difference in hours. Which hours are correct?",
                    ItemOptions = new List<ItemOption>
                    {
                        new ItemOption()
                        {
                            ErrorText = $"Steam record ",
                            ResolveUrl = $"/action/hours?hours={steamGame!.PlaytimeForever}&pgid={ug.PlatformGame.Id}&user={userGuid}",
                            GameTitle = ug.PlatformGame.Game.Title,
                            Hours = steamGame!.PlaytimeForever,
                        },
                        new ItemOption()
                        {
                            ErrorText = $"Playlist record ",
                            ResolveUrl = $"/action/hours?hours={ug.TimePlayed}&pgid={ug.PlatformGame.Id}&user={userGuid}",
                            GameTitle = ug.PlatformGame.Game.Title,
                            Hours = (int)(ug.TimePlayed!),
                        }
                    },
                };

                actionsToSend.Add(action);
            }
        }
        return actionsToSend;
    }

    public string ExtractSteamIdFromUrl(string urlParams)
    {
        var match = Regex.Match(urlParams, @"\d{17}");
        if (match.Success)
        {
            return match.Value;
        }
        else
        {
            return string.Empty;
        }
    }

    public void AddSteamKeyToUser(string userGuid, string steamId)
    {
        if (!string.IsNullOrEmpty(steamId))
        {
            AddUserPlatformRequest updateUserPlatformRequest = new AddUserPlatformRequest()
            {
                UserId = Guid.Parse(userGuid),
                ExternalPlatformId = steamId,
                PlatformId = 163, // platform id for Steam
            };

            userPlatformService.AddUserPlatform(updateUserPlatformRequest);
        }
    }

    public async Task AddSteamUsernameToUser(string userGuid, string steamId)
    {
        using var context = dbContextFactory.CreateDbContext();
        ArgumentNullException.ThrowIfNull(steamId);

        string username = String.Empty;

        var playerSummaryResponse = await client.GetStringAsync($"https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key={steamKey}&steamids={steamId}");

        using (JsonDocument doc = JsonDocument.Parse(playerSummaryResponse))
        {
            username = doc.RootElement
                            .GetProperty("response")
                            .GetProperty("players")[0]
                            .GetProperty("personaname")
                            .GetString() ?? throw new Exception("Error fetching Steam Persona Name");
        }

        var usr = context.UserAccounts.Where(x => x.Guid == new Guid(userGuid)).FirstOrDefault();

        var usrPlatform = context.UserPlatforms.Where(x => x.UserId == usr.Id && x.ExternalPlatformId == steamId).FirstOrDefault();

        if (usrPlatform is null)
        {
            throw new Exception("Could not find user platform to update");
        }

        UpdateUserPlatformRequest updateUserPlatformRequest = new UpdateUserPlatformRequest()
        {
            Id = usrPlatform.Id,
            ExternalPlatformId = steamId,
            GamerTag = username,
        };

        await userPlatformService.UpdateUserPlatform(updateUserPlatformRequest);
    }
}