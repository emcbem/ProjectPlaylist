using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.UpdateRequests;

namespace PlaylistApp.Server.Services.UserServices;

public interface IUserService
{
    public Task<UserDTO> GetUserById(Guid guid);
    public Task<bool> DeleteUserById(Guid userId);
    public Task<UserDTO> UpdateUser(UpdateUserRequest updateUserRequest);
    public Task<UserDTO> GetUserByAuthId(string authId);
    public Task<List<UserDTO>> GetUsersByName(string username);
}
