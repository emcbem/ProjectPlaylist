using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;

namespace PlaylistApp.Server.Services.UserPlatformServices;

public interface IUserPlatformService
{
    public Task<List<UserPlatformDTO>> GetAllByUser(Guid userId);
    public Task<bool> AddUserPlatform(AddUserPlatformRequest request);
    public Task<UserPlatformDTO> UpdateUserPlatform(UpdateUserPlatformRequest request);
    public Task<bool> DeleteUserPlatform(int userPlatformId);
    public Task<UserPlatform?> GetUserPlatfromById(int id);
}
