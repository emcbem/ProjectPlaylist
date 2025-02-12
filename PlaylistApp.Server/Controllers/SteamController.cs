using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.DTOs.CombinationData;
using PlaylistApp.Server.DTOs.SteamData;
using PlaylistApp.Server.Services.SteamServices;
using PlaylistApp.Server.Services.SteamServices.SteamGameService;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class SteamController : Controller
{
	private readonly ISteamService steamService;
	private readonly ISteamOrchestrator steamOrchestrator;
	private readonly IConfiguration config;
    public SteamController(ISteamService steamService, ISteamOrchestrator steamOrchestrator, IConfiguration config)
    {
        this.steamService = steamService;
		this.steamOrchestrator = steamOrchestrator;
		this.config = config;
    }

	[HttpPost("getuseractionlog")]
	public async Task<ItemAction> GetGamesBySteamId([FromBody] SteamActionLogRequest steamActionLogRequest)
	{
		return await steamOrchestrator.CollectActionItemsFromSteam(steamActionLogRequest);
	}

	[HttpGet("auth/{userId}")]
	public IActionResult AuthSteam(string userId)
	{
		string steamRedirectUrl = config["SteamRedirectBaseUrl"] ?? "https://localhost:7041";
		var redirectUrl = $"https://steamcommunity.com/openid/login?" +
					 "openid.mode=checkid_setup" +
					 "&openid.ns=http://specs.openid.net/auth/2.0" +
					 "&openid.identity=http://specs.openid.net/auth/2.0/identifier_select" +
					 "&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select" +
					 $"&openid.return_to={steamRedirectUrl}/Steam/verify/{userId}"; 

		return Redirect(redirectUrl);
	}

	[HttpGet("verify/{userGuid}")]
	public IActionResult Verify(string userGuid)
	{
		string urlParams = Request.GetDisplayUrl();

		string steamId = steamService.ExtractSteamIdFromUrl(urlParams);

		steamService.AddSteamKeyToUser(userGuid, steamId);

		steamService.AddSteamUsernameToUser(userGuid, steamId);

		string frontendBaseUrl = config["FrontendBaseUrl"] ?? "http://localhost:5173";
		return Redirect($"{frontendBaseUrl}?steamid={steamId}");
	}
}
