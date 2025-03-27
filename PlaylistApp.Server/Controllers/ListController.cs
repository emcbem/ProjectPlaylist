using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;
using PlaylistApp.Server.Services.ListServices;
using PlaylistApp.Server.Services.UserServices;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class ListController : Controller
{
    private readonly IListService listService;
    private readonly IUserService userService;

    public ListController(IListService listService, IUserService userService)
    {
        this.listService = listService;
        this.userService = userService;
    }

    [Authorize]
    [HttpPost("addlist")]
    public async Task<IResult> AddList(AddListRequest request)
    {
        var user = await userService.GetUserFromClaims(User);
        if(user.Guid != request.UserId)
        {
            return Results.Unauthorized();
        }

        return Results.Ok(await listService.AddList(request));
    }

    [Authorize]
    [HttpDelete("deletelist")]
    public async Task<IResult> DeleteList(int listId)
    {
        var user = await userService.GetUserFromClaims(User);
        var list = await listService.GetActualListById(listId);

        if(user.Id != list.UserId)
        {
            return Results.Unauthorized();
        }


        return Results.Ok(await listService.DeleteList(listId));
    }

    [HttpGet("getalllistsbyuser")]
    public async Task<List<ListDTO>> GetAllListsByUser(Guid userId)
    {
        return await listService.GetAllListsByUser(userId);
    }

    [HttpGet("getalllistsbyname")]
    public async Task<List<ListDTO>> GetAllListsByName(string listName)
    {
        return await listService.GetAllListsByName(listName);
    }

    [HttpGet("getlistbyid")]
    public async Task<ListDTO> GetListById(int listId)
    {
        return await listService.GetListById(listId);
    }

    [Authorize]
    [HttpPatch("updatelist")]
    public async Task<IResult> UpdateList(UpdateListRequest request)
    {
        var user = await userService.GetUserFromClaims(User);
        var list = await listService.GetActualListById(request.ListId);

        if (user.Id != list.UserId)
        {
            return Results.Unauthorized();
        }

        return Results.Ok(await listService.UpdateList(request)); 
    }
}
