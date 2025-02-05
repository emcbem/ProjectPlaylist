using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs.SteamData;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Services.UserPlatformServices;
using RestEase;
using System.Text.RegularExpressions;

namespace PlaylistApp.Server.Services.SteamServices;

public class SteamService : ISteamService
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;
    private readonly HttpClient client;
    private readonly IConfiguration config;
    private readonly IUserPlatformService userPlatformService;

    public SteamService(IDbContextFactory<PlaylistDbContext> dbContextFactory,
        HttpClient client,
        IConfiguration config,
        IUserPlatformService userPlatformService)
    {
        this.dbContextFactory = dbContextFactory;
        this.client = client;
        this.config = config;
        this.userPlatformService = userPlatformService;
    }

    public async Task<List<SteamActionItem>> GetGamesFromUserBasedOffOfSteamId(string steamId)
    {
        var steamKey = config["steamkey"];
        string url = $"https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key={steamKey}&steamid={steamId}&format=json";

        try
        {
            HttpResponseMessage response = await client.GetAsync(url);
            response.EnsureSuccessStatusCode();

            OwnedGamesResponse jsonResponse = await response.Content.ReadFromJsonAsync<OwnedGamesResponse>();

            if (jsonResponse == null)
            {
                throw new Exception("Something went wrong parsing the data from Steam. Is the account private?");
            }


            await AddMissingGamesToUserGames(jsonResponse, 5);

            List<SteamActionItem> userSteamGames = await FixTimeDifferences(jsonResponse, 5);

            return userSteamGames;
        }
        catch (HttpRequestException e)
        {
            Console.WriteLine("Request error: " + e.Message);
            throw new Exception();
        }
    }

    public async Task<List<PlatformGame>> ConvertSteamDataToPlatformGames(OwnedGamesResponse jsonGames, int userId)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        List<SteamRawGame> steamGames = jsonGames.Response.Games;

        

        HashSet<int> appIds = new HashSet<int>(steamGames.Select(g => g.AppId));
        Dictionary<int, int> playtimeDict = steamGames.ToDictionary(g => g.AppId, g => g.PlaytimeForever);

        List<PlatformGame> matchingPlatformGames = await context.PlatformGames 
            .Where(pg => appIds.Any(appId => appId.ToString() == pg.PlatformKey))
            .Include(g => g.Game)
            .Include(g => g.UserGames)
            .Include(p => p.Platform)
            .GroupBy(g => g.PlatformKey)
            .Select(g => g.First())
            .ToListAsync();

        return matchingPlatformGames;
    }


    public async Task<List<SteamActionItem>> CalculateDifferenceInGames(List<PlatformGame> games, int userId)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        List<UserGame> usersGames = context.UserGames
            .Where(x => x.UserId == userId)
            .Include(g => g.PlatformGame)
            .ThenInclude(g => g.Game)
            .ToList();
        HashSet<int> userGameIds = new HashSet<int>(usersGames.Select(x => x.PlatformGameId));

        List<SteamActionItem> gamesNotInPlaylistDb = new List<SteamActionItem>();

        foreach (var game in games)
        {
            if (!userGameIds.Contains(game.Id))
            {
                gamesNotInPlaylistDb.Add(new SteamActionItem
                {
                    PlatformGameId = game.Id,
                    GameTitle = game.Game.Title,
                    TotalPlayTime = 0,
                    ProblemText = "You have this game in Steam. Would you like to log it in your library?"
                });
            }
        }

        return gamesNotInPlaylistDb;
    }

    
    public async Task AddMissingGamesToUserGames(OwnedGamesResponse response, int userId)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        List<SteamRawGame> steamGames = response.Response.Games;
        List<PlatformGame> gamesFromSteam = await ConvertSteamDataToPlatformGames(response, userId);



        List<UserGame> usersGames = context.UserGames
            .Where(x => x.UserId == userId)
            .Include(g => g.PlatformGame)
            .ThenInclude(g => g.Game)
            .ToList();
        HashSet<int> userGameIds = new HashSet<int>(usersGames.Select(x => x.PlatformGameId));

        List<PlatformGame> gamesThatTheUserDoesntAlreadyHave = new List<PlatformGame>();
        foreach (PlatformGame pg in gamesFromSteam)
        {
            if (!userGameIds.Contains(pg.GameId))    // if they don't have the game
            {
                gamesThatTheUserDoesntAlreadyHave.Add(pg);
                SteamRawGame? steamGame = steamGames.Where(x => x.AppId.ToString() == pg.PlatformKey).FirstOrDefault();

                if (steamGame is not null)
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

    public async Task<List<SteamActionItem>> FixTimeDifferences(OwnedGamesResponse response, int userId)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();
        List<SteamRawGame> steamGames = response.Response.Games;
        List<PlatformGame> matchingPlatformGames = await ConvertSteamDataToPlatformGames(response, userId);

        List<UserGame> usersGames = context.UserGames
            .Where(x => x.UserId == userId)
            .Include(g => g.PlatformGame)
            .ThenInclude(g => g.Game)
            .ToList();

        HashSet<int> userGameIds = new HashSet<int>(usersGames.Select(x => x.PlatformGameId));

        List<SteamActionItem> actionsToTake = new List<SteamActionItem>();


        // Get the games that the user has, but have different times
        List<PlatformGame> nonMatchingTimeGames = new List<PlatformGame>();
        foreach (PlatformGame pg in matchingPlatformGames)
        {
            UserGame ug = context.UserGames.Where(x => x.PlatformGameId == pg.Id && x.UserId == userId).FirstOrDefault() ?? new UserGame();
            SteamRawGame steamGame = steamGames.Where(x => x.AppId == pg.GameId).FirstOrDefault() ?? new SteamRawGame();
            if (ug.TimePlayed != steamGame.PlaytimeForever)
            {
                nonMatchingTimeGames.Add(pg);

                var steamItem = new SteamActionItem();
                steamItem.GameTitle = pg.Game.Title ?? "No Title";
                steamItem.PlatformGameId = pg.Id;
                steamItem.ProblemText = $"Which platform do you play this game on? {pg.Platform.PlatformName}" ?? "unknown platform";
                steamItem.Url = $@"/action/platforms?PersonalMinutes={ug.TimePlayed}"
                            + $"&SteamMinutes={steamGame.PlaytimeForever}"  // doing playtime forever
                            + $"&platformgameid={pg.Id}";


                actionsToTake.Add(steamItem);
            }
        }

        return actionsToTake;
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

    public void AddSteamUserPlatform(string userId, string steamId)
    {
        if (!string.IsNullOrEmpty(steamId))
        {
            AddUserPlatformRequest updateUserPlatformRequest = new AddUserPlatformRequest()
            {
                UserId = Guid.Parse(userId),
                ExternalPlatformId = steamId,
                PlatformId = 163, // platform id for Steam
            };

            userPlatformService.AddUserPlatform(updateUserPlatformRequest);
        }
    }

}
