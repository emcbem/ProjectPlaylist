using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.GetRequests;
using PlaylistApp.Server.Requests.UpdateRequests;
using PlaylistApp.Server.Services.GoalServices;

namespace PlaylistApp.Server.Controllers;
[ApiController]
[Route("[controller]")]
public class GoalController : Controller
{
    private readonly IGoalService goalService;

    public GoalController(IGoalService goalService)
    {
        this.goalService = goalService;
    }

    [HttpPost("addgoal")]
    public async Task<int> AddGoal(AddGoalRequest request)
    {
        return await goalService.AddGoal(request);
    }

    [HttpDelete("deletegoal")]
    public async Task<bool> DeleteGoal(int goalId)
    {
        return await goalService.DeleteGoal(goalId);
    }

    [HttpGet("getgoalbyid")]
    public async Task<GoalDTO> GetGoalById(int goalId)
    {
        return await goalService.GetGoalById(goalId);
    }

    [HttpGet("getgoalsfromuser")]
    public async Task<List<GoalDTO>> GetGoalsFromUser(Guid userId)
    {
        return await goalService.GetGoalsFromUser(userId);
    }

    [HttpPatch("updategoal")]
    public async Task<GoalDTO> UpdateGoal(UpdateGoalRequest request)
    {
        return await goalService.UpdateGoal(request);
    }

    [HttpPost("getgoaltocomplete")]
    public async Task<GoalDTO> GetGoalToComplete(GetGoalToCompleteRequest request)
    {
        return await goalService.GetGoalForUserForAchievement(request);
    }
}
