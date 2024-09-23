using Microsoft.Extensions.Configuration.UserSecrets;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.DeleteRequests;

namespace PlaylistApp.Server.Services.GoalLikeServices;

public interface IGoalLikeService
{
    public Task<List<GoalDTO>> GetGoalLikesFromUser(Guid userId);
    public Task<bool> AddGoalLike(AddGoalLikeRequest request);
    public Task<bool> RemoveGoalLike(RemoveGoalLikeRequest request);
}
