﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.DeleteRequests;
using PlaylistApp.Server.Requests.GetRequests;
using PlaylistApp.Server.Requests.UpdateRequests;
using PlaylistApp.Server.Services.ReviewLikeServices;

namespace PlaylistApp.Server.Controllers;
[ApiController]
[Route("[controller]")]
public class ReviewLikeController : Controller
{
    private readonly IReviewLikeService reviewLikeService;

    public ReviewLikeController(IReviewLikeService reviewLikeService)
    {
        this.reviewLikeService = reviewLikeService;
    }

    [Authorize]
    [HttpPost("addreviewlike")]
    public async Task<bool> AddReviewLikeService(AddReviewLikeRequest request)
    {
        return await reviewLikeService.AddReviewLike(request);
    }

    [HttpGet("getallbyuser")]
    public async Task<List<GameReviewDTO>> GetAllByUser(Guid userId)
    {
        return await reviewLikeService.GetAllByUser(userId);
    }

    [Authorize]
    [HttpPost("removereviewlike")]
    public async Task<bool> RemoveReviewLike(RemoveReviewLikeRequest request)
    {
        return await reviewLikeService.RemoveReviewLike(request);
    }

    [Authorize]
    [HttpPatch("updatereviewlike")]
    public async Task<bool> UpdateReviewLike(UpdateReviewLikeRequest request)
    {
        return await reviewLikeService.UpdateReviewLike(request);
    }

    [HttpPost("getreviewlike")]
    public async Task<ReviewLikeDTO> GetReviewLike(GetReviewLikeRequest request)
    {
        return await reviewLikeService.GetReviewLike(request);
    }
}
