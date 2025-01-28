using Microsoft.AspNetCore.Mvc;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class SteamController : Controller
{
	//private static readonly OpenIdRelyingParty RelyingParty = new OpenIdRelyingParty();
	//internal static OpenIdProvider OpenIdProvider = new OpenIdProvider();

	//private readonly string steamOpenIdUrl = "https://steamcommunity.com/openid";
	//private readonly string verifyUrl = "http://localhost:3001/verify"; // Change this as necessary

	//[HttpGet("steam")]
	//public async Task<IActionResult> AuthSteam()
	//{
	//	HttpClient client = new HttpClient();
	//	var result = await client.SendAsync( new HttpRequestMessage(HttpMethod.Get, steamOpenIdUrl),
	//		HttpCompletionOption.ResponseHeadersRead);

	//	return View();
	//}

	//[HttpGet("verify")]
	//public async Task<IActionResult> Verify()
	//{
	//	//var relyingParty = new RelyingParty(verifyUrl);
	//	//var response = RelyingParty.GetResponseAsync(null, null);
	//	//var request = await OpenIdProvider.GetRequestAsync(this.Request, this.Response.ClientDisconnectedToken);
	//	////var response = RelyingParty.ProcessResponse(Request.Query);

	//	//if (response.Status != AuthenticationStatus.Authenticated)
	//	//{
	//	//	return StatusCode(500, "Authentication failed: " + response.Status);
	//	//}

	//	//// Extract Steam ID
	//	//var steamId = response.ClaimedIdentifier.ToString().Replace("https://steamcommunity.com/openid/id/", "");

	//	//// Store Steam ID in session
	//	//HttpContext.Session.SetString("SteamId", steamId);

	//	//return Redirect($"http://localhost:5173/?steamid={steamId}"); // Redirect to the React app
	//}

	//[HttpGet("user")]
	//public IActionResult GetUser()
	//{
	//	var steamId = HttpContext.Session.GetString("SteamId");

	//	if (steamId == null)
	//	{
	//		return Unauthorized(new { authenticated = false });
	//	}

	//	return Ok(new { authenticated = true, steamId });
	//}

	//internal static OpenIdProvider OpenIdProvider = new OpenIdProvider();

	//// Start User Login
	//[HttpGet("/steam/startuserlogin")]
	//public async Task<ActionResult> StartUserLogin()
	//{
	//	IRequest request = await OpenIdProvider.GetRequestAsync(Request, this.Response.ClientDisconnectedToken)
	//	//using (OpenIdRelyingParty openid = new OpenIdRelyingParty())
	//	//{
	//	//	IAuthenticationRequest request = openid.CreateRequestAsync()
	//	//}
	//	//var rp = new OpenIdRelyingParty();
	//	////DotNetOpenAuth.OpenId.Identifier usi = "https://steamcommunity.com/openid";
	//	//var response = await rp.CreateRequestAsync("https://steamcommunity.com/openid", Realm.AutoDetect, new Uri("https://localhost:7041"));


	//}

	//private static readonly OpenIdRelyingParty RelyingParty = new OpenIdRelyingParty();

	//[HttpGet("steam/startUserLogin")]
	//public async Task<IActionResult> SteamLogin()
	//{
	//	try
	//	{
	//		// Start the OpenID authentication process
	//		//var request = RelyingParty.CreateRequest("https://steamcommunity.com/openid");
	//		var request = RelyingParty.CreateRequest("https://steamcommunity.com/openid");

	//		// Redirect to the authentication URL
	//		return Redirect(await request.RedirectToProviderAsync());
	//	}
	//	catch (Exception ex)
	//	{
	//		// Handle any errors that occurred during the authentication process
	//		return new HttpStatusCodeResult(500, "Authentication error: " + ex.Message);
	//	}
	//}

	// Verify Steam Login

	// Get User Session Info

	// Start the server
}
