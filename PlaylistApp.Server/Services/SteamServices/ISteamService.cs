namespace PlaylistApp.Server.Services.SteamServices;

public interface ISteamService
{
	public void ConnectWithSteamUsingUserLogin();
	public Task GetGamesFromUserBasedOffOfSteamId(string steamId);
}
