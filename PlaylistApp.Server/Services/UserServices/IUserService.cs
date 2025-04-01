using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;
using System.Security.Claims;

namespace PlaylistApp.Server.Services.UserServices;

public interface IUserService
{
    public Task<UserDTO> GetUserById(Guid guid);
    public Task<bool> DeleteUserById(Guid userId);
    public Task<UserDTO> UpdateUser(UpdateUserRequest updateUserRequest);
    public Task<UserDTO> GetUserByAuthId(string authId);
    public Task<UserDTO> GetUsersByName(string username);
    public Task<List<UserDTO>> GetUsersBySearchQuery(string searchQuery);
    public Task<bool> AddUser(AddUserRequest addUserRequest);
    public Task<bool> StrikeUser(string request);
    public Task<UserDTO> GetUserFromClaims(ClaimsPrincipal claims);
    public Task<UserAccount> GetAuditUser(Guid userId);
}
