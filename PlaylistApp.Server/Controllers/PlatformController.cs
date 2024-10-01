using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Services.PlatformServices;

namespace PlaylistApp.Server.Controllers;
[ApiController]
[Route("[controller]")]
public class PlatformController : Controller
{
    private readonly IPlatformService platformService;

    public PlatformController(IPlatformService platformService)
    {
        this.platformService = platformService;
    }

    [HttpGet("getallplatforms")]
    public async Task<List<PlatformDTO>> GetAllPlatforms()
    {
        return await platformService.GetAllPlatforms(); 
    }

    [HttpGet("getplatformbyid")]
    public async Task<PlatformDTO> GetPlatformById(int platformId)
    {
        return await platformService.GetPlatformById(platformId);
    }

    [HttpGet("getplatformbyname")]
    public async Task<List<PlatformDTO>> GetPlatformsByName(string platformName)
    {
        return await platformService.GetPlatformsByName(platformName);
    }
}
