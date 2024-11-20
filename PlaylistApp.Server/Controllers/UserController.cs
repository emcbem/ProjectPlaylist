using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
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
    public async Task<UserDTO> GetUsersByName(string username)
    {
        return await userService.GetUsersByName(username);
    }

    [HttpGet("search")]
    public async Task<List<UserDTO>> GetUsersBySearchQuery(string query)
    {
        return await userService.GetUsersBySearchQuery(query);
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

    [HttpPost("addnewuser")]
    public async Task<bool> AddNewUser([FromBody] AddUserRequest addUserRequest)
    {
        return await userService.AddUser(addUserRequest);
    }
}
