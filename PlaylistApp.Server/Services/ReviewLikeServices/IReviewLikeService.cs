using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.DeleteRequests;
using PlaylistApp.Server.Requests.GetRequests;
using PlaylistApp.Server.Requests.UpdateRequests;

namespace PlaylistApp.Server.Services.ReviewLikeServices;

public interface IReviewLikeService
{
    public Task<bool> AddReviewLike(AddReviewLikeRequest request);
    public Task<bool> RemoveReviewLike(RemoveReviewLikeRequest request);
    public Task<List<GameReviewDTO>> GetAllByUser(Guid userId);
    public Task<bool> UpdateReviewLike(UpdateReviewLikeRequest request);
    public Task<ReviewLikeDTO> GetReviewLike(GetReviewLikeRequest request);
}
