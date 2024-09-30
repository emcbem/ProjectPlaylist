using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.DeleteRequests;
using PlaylistApp.Server.Services.GoalLikeServices;

namespace PlaylistApp.Server.Controllers;
[ApiController]
[Route("[controller]")]
public class GoalLikeController : Controller
{
    private readonly IGoalLikeService goalLikeService;

    public GoalLikeController(IGoalLikeService goalLikeService)
    {
        this.goalLikeService = goalLikeService;
    }

    [HttpPost("addgoallike")]
    public async Task<bool> AddGoalLike(AddGoalLikeRequest request)
    {
        return await goalLikeService.AddGoalLike(request);
    }

    [HttpGet("getgoallikesfromuser")]
    public async Task<List<GoalDTO>> GetGoalLikesFromUser(Guid userId)
    {
        return await goalLikeService.GetGoalLikesFromUser(userId);
    }

    [HttpDelete("removegoallike")]
    public async Task<bool> RemoveGoalLike(RemoveGoalLikeRequest request)
    {
        return await goalLikeService.RemoveGoalLike(request);
    }
}
