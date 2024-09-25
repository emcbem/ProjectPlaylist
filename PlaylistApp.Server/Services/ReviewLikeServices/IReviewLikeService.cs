using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.DeleteRequests;

namespace PlaylistApp.Server.Services.ReviewLikeServices;

public interface IReviewLikeService
{
    public Task<bool> AddReviewLike(AddReviewLikeRequest request);
    public Task<bool> RemoveReviewLike(RemoveReviewLikeRequest request);
    public Task<List<GameReviewDTO>> GetAllByUser(Guid userId);
}
