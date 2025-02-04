using IdentityModel.Client;
using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.DTOs.SteamData;
using PlaylistApp.Server.Services.SteamServices;
using System.Web;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class SteamController : Controller
{
	private readonly ISteamService steamService;
    public SteamController(ISteamService steamService)
    {
        this.steamService = steamService;
    }

	[HttpPost("getuseractionlog/{userSteamId}")]
	public async Task<List<DTOs.SteamData.SteamActionItem>> GetGamesBySteamId(string userSteamId)
	{
		return await steamService.GetGamesFromUserBasedOffOfSteamId(userSteamId);
	}




	private const string SteamOpenIdUrl = "https://steamcommunity.com/openid";
	private const string VerifyUrl = "https://localhost:7041/Steam/verify"; // Adjust the port if needed

	[HttpGet("auth/steam")]
	public IActionResult AuthSteam()
	{
		//var redirectUrl = "https://google.com";
		//var redirectUrl = "https://steamcommunity.com/openid/login?openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.return_to=https%3A%2F%2Flocalhost%3A7041%2Fsteam%2Fverify";
		// Build the redirect URL for Steam OpenID authentication
		var blach = $"{SteamOpenIdUrl}/login?openid.mode=checkid_setup" +
					"&openid.ns=http://specs.openid.net/auth/2.0" +
					"&openid.identity=http://specs.openid.net/auth/2.0/identifier_select" +
					"&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select" +
					"&openid.return_to=https://localhost:7041/steam/verify";
		var redirectUrl2 = $"{SteamOpenIdUrl}?openid.mode=checkid_setup" +
						  "&openid.identity=http://specs.openid.net/auth/2.0/identifier_select" +
						  "&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select" +
						  $"&openid.return_to={HttpUtility.UrlEncode(VerifyUrl)}";

		var redirectUrl = $"{SteamOpenIdUrl}/login?" +
					 "openid.mode=checkid_setup" +
					 "&openid.ns=http://specs.openid.net/auth/2.0" +
					 "&openid.identity=http://specs.openid.net/auth/2.0/identifier_select" +
					 "&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select" +
					 "&openid.return_to=https://localhost:7041/steam/verify"; 

		return Redirect(redirectUrl);
	}


	[HttpGet("verify")]
	public async Task<IActionResult> Verify(string openid_sig, string openid_assoc_handle, string openid_claimed_id, string openid_identity, string openid_mode)
	{
		if (openid_mode != "id_res")
		{
			return BadRequest("Invalid OpenID response.");
		}

		var parameters = new Dictionary<string, string>
	{
		{ "openid.mode", "check_authentication" },
		{ "openid.claimed_id", openid_claimed_id },
		{ "openid.identity", openid_identity },
		{ "openid.assoc_handle", openid_assoc_handle },
		{ "openid.sig", openid_sig }
	};

		var client = new HttpClient();
		var content = new FormUrlEncodedContent(parameters);
		var response = await client.PostAsync("https://steamcommunity.com/openid/login", content);

		var responseBody = await response.Content.ReadAsStringAsync();

		if (!responseBody.Contains("is_valid:true"))
		{
			return BadRequest("Authentication failed: Invalid OpenID response.");
		}

		var steamId = openid_claimed_id.Replace("https://steamcommunity.com/openid/id/", "");

		HttpContext.Session.SetString("SteamId", steamId);

		return Redirect($"https://localhost:5173/?steamid={steamId}");
	}

	//[HttpGet("verify")]
	//public IActionResult Verify(string openid_sig, string openid_assoc_handle, string openid_claimed_id, string openid_identity, string openid_mode)
	//{
	//	// Verify the response from Steam and extract the Steam ID
	//	if (openid_mode != "id_res")
	//	{
	//		return BadRequest("Invalid OpenID response.");
	//	}

	//	// Extract Steam ID from openid_claimed_id
	//	var steamId = openid_claimed_id.Replace("https://steamcommunity.com/openid/id/", "");

	//	// Store Steam ID in session
	//	HttpContext.Session.SetString("SteamId", steamId);

	//	return Redirect($"https://localhost:5173/?steamid={steamId}"); // Redirect to your React app
	//}

	[HttpGet("user")]
	public IActionResult GetUser()
	{
		var steamId = HttpContext.Session.GetString("SteamId");
		if (string.IsNullOrEmpty(steamId))
		{
			return Unauthorized(new { authenticated = false });
		}
		return Ok(new { authenticated = true, steamId });
	}
}
