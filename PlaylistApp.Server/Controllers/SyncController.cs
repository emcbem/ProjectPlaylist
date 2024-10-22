using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.Services.SyncServices;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class SyncController
{
	private SyncService SyncService { get; set; }

	public SyncController(SyncService syncService)
	{
		SyncService = syncService;
	}

    [HttpGet("steamToOtherPlatformAchievements")]
	public async Task SyncAchievementsFromSteamToPlaystation()
	{
		await SyncService.SyncSteamAchievementsWithCorespondingPlatformGames();
	}
}
