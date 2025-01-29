using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using System.Net.Http;

namespace PlaylistApp.Server.Services.SteamServices;

public class SteamService : ISteamService
{
	private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;
	private readonly HttpClient client;

	public SteamService(IDbContextFactory<PlaylistDbContext> dbContextFactory, HttpClient client)
	{
		this.dbContextFactory = dbContextFactory;
		this.client = client;
	}

	private readonly string steamUrl = "https://steamcommunity.com/stats/";


	public async Task GetGamesFromUserBasedOffOfSteamId(string steamId)
	{
		try
		{
			string url = $"https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=BC57910262595AF7BA3A78983581E07E&steamid={steamId}&format=json";
			string jsonResponse = "";

			try
			{
				// Send a GET request to the API
				HttpResponseMessage response = await client.GetAsync(url);
				response.EnsureSuccessStatusCode();
				jsonResponse = await response.Content.ReadAsStringAsync();

		
			}
			catch (HttpRequestException e)
			{
				Console.WriteLine("Request error: " + e.Message);
			}

			// Process jsonResponse here (e.g., deserialize into an object)
		}
		catch (Exception e)
		{
			Console.WriteLine("An error occurred: " + e.Message);
		}
	}

	public void ConnectWithSteamUsingUserLogin()
	{
		throw new NotImplementedException();
	}
}

public class OwnedGamesResponse
{
	public Response Response { get; set; }
}

public class Response
{
	public int GameCount { get; set; }
	public List<SteamGame> Games { get; set; }
}

public class SteamGame
{
	public int AppId { get; set; }
	public int PlaytimeForever { get; set; }
	public int PlaytimeWindowsForever { get; set; }
	public int PlaytimeMacForever { get; set; }
	public int PlaytimeLinuxForever { get; set; }
	public int PlaytimeDeckForever { get; set; }
	public long RTimeLastPlayed { get; set; }
	public int PlaytimeDisconnected { get; set; }
}
