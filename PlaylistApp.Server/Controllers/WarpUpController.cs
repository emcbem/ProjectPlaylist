using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.DTOs.WrapUpData;
using PlaylistApp.Server.Requests.GetRequests;
using PlaylistApp.Server.Services.WrapUpServices;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class WarpUpController : Controller
{
    private readonly IWrapUpService wrapUpService;
    public WarpUpController(IWrapUpService wrapUpService)
    {
        this.wrapUpService = wrapUpService;
    }

    [HttpPost("getwrapup")]
    public async Task<WrapUpDTO> GetWrapUp(GetWrapUpRequest request)
    {
        return await wrapUpService.OrchestrateWrapUpGathering(request);
    }
}
