﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.DeleteRequests;
using PlaylistApp.Server.Requests.GetRequests;
using PlaylistApp.Server.Requests.UpdateRequests;
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

    [Authorize]
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

    [Authorize]
    [HttpPost("removegoallike")]
    public async Task<bool> RemoveGoalLike(RemoveGoalLikeRequest request)
    {
        return await goalLikeService.RemoveGoalLike(request);
    }

    [Authorize]
    [HttpPatch("updategoallike")]
    public async Task<bool> UpdateGoalLike(UpdateGoalLikeRequest request)
    {
        return await goalLikeService.UpdateGoalLike(request);
    }

    [HttpPost("getgoallike")]
    public async Task<GoalLikeDTO> GetGoalLike(GetGoalLikeRequest request)
    {
        return await goalLikeService.GetGoalLike(request);
    }
}
