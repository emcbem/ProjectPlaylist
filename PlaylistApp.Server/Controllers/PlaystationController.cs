using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.Services.PlaystationServices;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class PlaystationController : Controller
{
    private readonly PlaystationAuthenticationService playstationService;
    private readonly IConfiguration config;

    public PlaystationController(PlaystationAuthenticationService playstationAuthenticationService, IConfiguration configuration)
    {
        playstationService = playstationAuthenticationService;
        config = configuration;
    }

    [HttpPost("gettoken")]
    public async Task<IActionResult> GetPlaystationAuthenticationToken()
    {
        var npsso = config["npsso"];

        if (string.IsNullOrWhiteSpace(npsso))
        {
            return BadRequest(new { Error = "npsso token is required." });
        }

        try
        {
            await playstationService.GetPlaystationAuthenticationToken(npsso);
            return Ok(new { Message = "Token successfully retrieved." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new {Error = ex.Message});
        }
    }
}
