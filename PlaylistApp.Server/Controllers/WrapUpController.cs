using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.DTOs.WrapUpData;
using PlaylistApp.Server.Requests.GetRequests;
using PlaylistApp.Server.Services.WrapUpServices;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class WrapUpController : Controller
{
    private readonly IWrapUpService wrapUpService;
    public WrapUpController(IWrapUpService wrapUpService)
    {
        this.wrapUpService = wrapUpService;
    }

    [HttpPost("getwrapup")]
    public async Task<WrapUpDTO> GetWrapUp(GetWrapUpRequest request)
    {
        var result = await wrapUpService.OrchestrateWrapUpGathering(request);
        return result;
    }
}
