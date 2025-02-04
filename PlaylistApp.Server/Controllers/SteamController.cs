using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using PlaylistApp.Server.Services.SteamServices;
using PlaylistApp.Server.Services.UserPlatformServices;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class SteamController : Controller
{
	private readonly ISteamService steamService;
	private readonly IConfiguration config;
    public SteamController(ISteamService steamService, IConfiguration config)
    {
        this.steamService = steamService;
		this.config = config;
    }

	[HttpPost("getuseractionlog/{userSteamId}")]
	public async Task<List<DTOs.SteamData.SteamActionItem>> GetGamesBySteamId(string userSteamId)
	{
		return await steamService.GetGamesFromUserBasedOffOfSteamId(userSteamId);
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

	[HttpGet("verify/{userId}")]
	public IActionResult Verify(string userId)
	{
		string urlParams = Request.GetDisplayUrl();

		string steamId = steamService.ExtractSteamIdFromUrl(urlParams);

		steamService.AddSteamUserPlatform(userId, steamId);

		string frontendBaseUrl = config["FrontendBaseUrl"] ?? "http://localhost:5173";
		return Redirect($"{frontendBaseUrl}?steamid={steamId}");
	}
}
