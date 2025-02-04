using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs.SteamData;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Services.UserPlatformServices;
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

    public async Task<List<DTOs.SteamData.SteamActionItem>> GetGamesFromUserBasedOffOfSteamId(string steamId)
    {
        var steamKey = config["steamkey"];
        string url = $"https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key={steamKey}&steamid={steamId}&format=json";

        try
        {
            HttpResponseMessage response = await client.GetAsync(url);
            response.EnsureSuccessStatusCode();

            var jsonResponse = await response.Content.ReadFromJsonAsync<OwnedGamesResponse>();

            if (jsonResponse == null)
            {
                throw new Exception("Something went wrong parsing the data from Steam. Is the account private?");
            }

			var userSteamGames = await ParseSteamSummary(jsonResponse);

            return userSteamGames;
        }
        catch (HttpRequestException e)
        {
            Console.WriteLine("Request error: " + e.Message);
            throw new Exception();
        }
    }

    public async Task<List<PlatformGame>> MatchedPlatformGames(OwnedGamesResponse jsonGames)
    {
		using var context = await dbContextFactory.CreateDbContextAsync();

		List<SteamRawGame> games = jsonGames.Response.Games;

		HashSet<int> appIds = new HashSet<int>(games.Select(g => g.AppId));
		Dictionary<int, int> playtimeDict = games.ToDictionary(g => g.AppId, g => g.PlaytimeForever);

		var matchingPlatformGames = await context.PlatformGames
			.Where(pg => appIds.Any(appId => appId.ToString() == pg.PlatformKey))
			.Include(g => g.Game)
			.ToListAsync();

        return matchingPlatformGames;
	}

    public async Task<List<ActionItem>> CalculateDifferenceInGames(List<PlatformGame> games, int userId)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        List<UserGame> usersGames = context.UserGames
            .Where(x => x.UserId == userId)
            .Include(g => g.PlatformGame)
            .ThenInclude(g => g.Game)
            .ToList();
        HashSet<int> userGameIds = new HashSet<int>(usersGames.Select(x => x.PlatformGameId));

        List<ActionItem> gamesNotOwned = new List<ActionItem>();



        foreach (var game in games)
        {
            if (!userGameIds.Contains(game.Id))
            {
                gamesNotOwned.Add(new ActionItem
                {
					PlatformGameId = game.Id,
					GameTitle = game.Game.Title,
                    SteamPlayTime = 0,
                    ProblemText = "You have this game in Steam. Would you like to log it in your library?"
                });
            }
        }

        return gamesNotOwned;
    }

    public async Task<List<DTOs.SteamData.SteamActionItem>> ParseSteamSummary(OwnedGamesResponse response)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        List<SteamRawGame> games = response.Response.Games;

        HashSet<int> appIds = new HashSet<int>(games.Select(g => g.AppId));
        Dictionary<int, int> playtimeDict = games.ToDictionary(g => g.AppId, g => g.PlaytimeForever);

        var matchingPlatformGames = await context.PlatformGames
            .Where(pg => appIds.Any(appId => appId.ToString() == pg.PlatformKey))
            .Include(g => g.Game)
            .ToListAsync();

        var userSteamGames = matchingPlatformGames.Select(platformGame => new ActionItem
        {
            PlatformGameId = platformGame.Id,
            GameTitle = platformGame.Game.Title ?? string.Empty,
            TotalPlayTime = playtimeDict.GetValueOrDefault(int.Parse(platformGame.PlatformKey ?? ""), 0),
            ProblemText = "Problem Text",   // depends on the type of problem. 
            Url = "some URL for something", // url of a special place in our system that we will redirect users to?
            ImageUrl = platformGame.Game.CoverUrl ?? string.Empty,  // default image?
        }).ToList();

        return userSteamGames;
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
