using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs.CombinationData;
using PlaylistApp.Server.DTOs.SteamData;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Services.UserPlatformServices;
using RestEase;
using System.Collections.Generic;
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

	public List<ItemAction> SteamActions { get; set; } = new();

	public async Task<OwnedGamesResponse> GetGamesFromUserBasedOffOfSteamId(string steamId)
	{
		var steamKey = config["steamkey"];
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

	public async Task<List<ItemAction>> FindGameInconsistenciesWithUserAccount(List<PlatformGame> matchingPlatformGames, List<SteamRawGame> steamGames, int userId)
	{
		List<ItemAction> actionList = new();
		using var context = await dbContextFactory.CreateDbContextAsync();

		var duplicatePlatformKeys = matchingPlatformGames
			.GroupBy(pg => pg.PlatformKey)
			.Where(g => g.Count() > 1)
			.Select(g => g.Key)
			.ToList();

		var gamesWithSamePlatformKeys = matchingPlatformGames
			.Where(pg => duplicatePlatformKeys.Contains(pg.PlatformKey))
			.ToList();

		foreach (PlatformGame p in gamesWithSamePlatformKeys)
		{
			var steamGame = steamGames.Where(x => x.AppId.ToString() == p.PlatformKey).FirstOrDefault();
			if(steamGame != null)
			{
				actionList.Add(new ItemAction()
				{
					ErrorType = "Multiple Platforms",
					ItemOptions = new List<ItemOption>() { 
						new ItemOption() { 
							ErrorText = "Multiple Platforms Found", 
							GameTitle = p.Game.Title, 
							ResolveUrl = $"/action/platforms/?hours={steamGame.PlaytimeForever}&pgid={p.Id}&user={userId}"
						} 
					}
				});
			}
		}

		return actionList;
	}

	public async Task AddMissingGamesToUserGames(OwnedGamesResponse response, int userId)
	{
		using var context = await dbContextFactory.CreateDbContextAsync();

		List<SteamRawGame> steamGames = response.Response.Games;

		steamGames = steamGames.GroupBy(x => x.AppId).SelectMany(g => g).ToList();

		List<PlatformGame> platformGamesFromSteam = await ConvertSteamToPlatformGames(response);

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

	public async Task<List<SteamActionItem>> FixTimeDifferences(OwnedGamesResponse response, int userId)
	{
		// Not implemented yet...
		using var context = await dbContextFactory.CreateDbContextAsync();
		List<SteamRawGame> steamGames = response.Response.Games;
		List<PlatformGame> matchingPlatformGames = await ConvertSteamToPlatformGames(response);

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

	public void AddSteamKeyToUser(string userId, string steamId)
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
