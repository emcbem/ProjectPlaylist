using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;
using PlaylistApp.Server.Services.ListServices;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class ListController : Controller
{
    private readonly IListService listService;

    public ListController(IListService listService)
    {
        this.listService = listService;
    }

    [HttpPost("addlist")]
    public async Task<int> AddList(AddListRequest request)
    {
        return await listService.AddList(request);
    }

    [HttpDelete("deletelist")]
    public async Task<bool> DeleteList(int listId)
    {
        return await listService.DeleteList(listId);
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

    [HttpPatch("updatelist")]
    public async Task<ListDTO> UpdateList(UpdateListRequest request)
    {
        return await listService.UpdateList(request); 
    }
}
