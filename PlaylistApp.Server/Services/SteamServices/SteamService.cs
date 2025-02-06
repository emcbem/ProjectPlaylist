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

	public async Task<List<ItemAction>> FixTimeDifferences(OwnedGamesResponse response, List<PlatformGame> matchingPlatformGames, List<SteamRawGame> steamGames, int userId)
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

		List<UserGame> usersGames = context.UserGames
			.Where(x => x.UserId == userId)
			.Include(g => g.PlatformGame)
			.ThenInclude(g => g.Game)
			.ToList();

		HashSet<int> userGameIds = new HashSet<int>(usersGames.Select(x => x.PlatformGameId));

		List<ItemAction> actionList = new List<ItemAction>();

		foreach (PlatformGame pg in matchingPlatformGames)
		{
			UserGame? ug = usersGames.Where(x => x.PlatformGameId == pg.Id && x.UserId == userId).FirstOrDefault();
			SteamRawGame? steamGame = steamGames.Where(x => x.AppId.ToString() == pg.PlatformKey).FirstOrDefault();


			
			if (ug.TimePlayed != steamGame?.PlaytimeForever)
			{
				actionList.Add(new ItemAction()
				{
					ErrorType = "Time Difference Found",
					ItemOptions = new List<ItemOption>() {
						new ItemOption() {
							ErrorText = $"We found {ug.TimePlayed} minutes in Playlist but {steamGame?.PlaytimeForever} minutes in Steam...",
							GameTitle = ug.PlatformGame.Game.Title,
							ResolveUrl = $"/action/hours/?PersonalMinutes={ug.TimePlayed}&SteamMinutes={steamGame?.PlaytimeForever}&pgid={ug.PlatformGame.Id}&user={userId}"
						}
					}
				});
			}
		}

		return actionList;
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
