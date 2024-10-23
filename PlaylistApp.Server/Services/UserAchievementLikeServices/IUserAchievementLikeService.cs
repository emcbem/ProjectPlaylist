using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.DeleteRequests;

namespace PlaylistApp.Server.Services.UserAchievementLikeServices;

public interface IUserAchievementLikeService
{
    public Task<List<UserAchievementDTO>> GetAchievementUserLikesFromUserId(Guid id);
    public Task<bool> AddUserAchievementLike(AddUserAchievementLike addRequest);
    public Task<bool> RemoveUserAchievementLike(RemoveUserAchievementLikeRequest removeRequest);

}
