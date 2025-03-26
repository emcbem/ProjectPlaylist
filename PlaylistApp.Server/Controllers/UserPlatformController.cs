using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;
using PlaylistApp.Server.Services.UserPlatformServices;

namespace PlaylistApp.Server.Controllers;
[ApiController]
[Route("[controller]")]
public class UserPlatformController : Controller
{
    private readonly IUserPlatformService userPlatformService;

    public UserPlatformController(IUserPlatformService userPlatformService)
    {
        this.userPlatformService = userPlatformService;
    }

    [Authorize]
    [HttpPost("adduserplatform")]
    public async Task<bool> AddUserPlatform(AddUserPlatformRequest request)
    {
        return await userPlatformService.AddUserPlatform(request);
    }

    [Authorize]
    [HttpDelete("deleteuserplatform")]
    public async Task<bool> DeleteUserPlatform(int userPlatformId)
    {
        return await userPlatformService.DeleteUserPlatform(userPlatformId);
    }

    [HttpGet("getallbyuser")]
    public async Task<List<UserPlatformDTO>> GetAllByUser(Guid userId)
    {
        return await userPlatformService.GetAllByUser(userId);
    }

    [Authorize]
    [HttpPatch("updateuserplatform")]
    public async Task<UserPlatformDTO> UpdateUserPlatform(UpdateUserPlatformRequest request)
    {
        return await userPlatformService.UpdateUserPlatform(request);
    }
}
