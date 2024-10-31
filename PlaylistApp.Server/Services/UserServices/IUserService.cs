using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;

namespace PlaylistApp.Server.Services.UserServices;

public interface IUserService
{
    public Task<UserDTO> GetUserById(Guid guid);
    public Task<bool> DeleteUserById(Guid userId);
    public Task<UserDTO> UpdateUser(UpdateUserRequest updateUserRequest);
    public Task<UserDTO> GetUserByAuthId(string authId);
    public Task<UserDTO> GetUsersByName(string username);
    public Task<bool> AddUser(AddUserRequest addUserRequest);
}
