using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.UpdateRequests;
using PlaylistApp.Server.Services.UserServices;

namespace PlaylistApp.Server.Controllers;
[ApiController]
[Route("[controller]")]
public class UserController : Controller
{
    private readonly IUserService userService;

    public UserController(IUserService userService)
    {
        this.userService = userService;
    }

    [HttpDelete("deleteuser")]
    public async Task<bool> DeleteUserById(Guid userId)
    {
        return await userService.DeleteUserById(userId);
    }

    [HttpGet("getuserbyid")]
    public async Task<UserDTO> GetUserById(Guid userId)
    {
        return await userService.GetUserById(userId);
    }

    [HttpGet("getusersbyname")]
    public async Task<List<UserDTO>> GetUsersByName(string username)
    {
        return await userService.GetUsersByName(username);
    }

    [HttpPatch("updateuser")]
    public async Task<UserDTO> UpdateUser(UpdateUserRequest request)
    {
        return await userService.UpdateUser(request);
    }

    [HttpGet("getuserbyauthid")]
    public async Task<UserDTO> GetUserByAuthId(string authId)
    {
        return await userService.GetUserByAuthId(authId);
    }
}
