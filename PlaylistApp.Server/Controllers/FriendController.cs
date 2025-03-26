using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;
using PlaylistApp.Server.Services.FriendServices;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class FriendController : Controller
{
    private readonly IFriendService friendService;

    public FriendController(IFriendService friendService)
    {
        this.friendService = friendService; 
    }

    [Authorize]
    [HttpPatch("acceptfriend")]
    public async Task<bool> AcceptFriend(AcceptFriendRequest request)
    {
        return await friendService.AcceptFriend(request);
    }

    [Authorize]
    [HttpPost("addfriend")]
    public async Task<bool> AddFriend(AddFriendRequest request)
    {
        return await friendService.AddFriend(request);
    }

    [HttpGet("getallfriendsbybaseid")]
    public async Task<List<UserDTO>> GetAllFriendsByBaseId(Guid baseId)
    {
        return await friendService.GetAllFriendsByBaseId(baseId);
    }

    [HttpGet("getfriendbybaseid")]
    public async Task<FriendDTO> GetFriendByBaseId(int id)
    {
        return await friendService.GetFriendByBaseId(id);
    }


    [HttpGet("getfriendbyid")]
    public async Task<FriendDTO> GetFriendById(int friendId)
    {
        return await friendService.GetFriendById(friendId);
    }

    [HttpGet("getbasependingrequests")]
    public async Task<List<FriendDTO>> GetBasePendingRequests(int baseId)
    {
        return await friendService.GetBasePendingRequests(baseId);
    }

    [Authorize]
    [HttpDelete("removefriend")]
    public async Task<bool> RemoveFriend(int friendId, int userId)
    {
        return await friendService.RemoveFriend(friendId, userId);
    }

    //[HttpPost("updateNotifications")]
    //public async Task<bool> UpdateNotifications()
}
