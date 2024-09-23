using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;

namespace PlaylistApp.Server.Services.UserGameServices;

public interface IUserGameService
{
    public Task<UserGameDTO> GetUserGameById(int id);
    public Task<List<UserGameDTO>> GetUserGameByUser(Guid userId);
    public Task<int> AddUserGame(AddUserGameRequest request);
    public Task<bool> RemoveUserGame(int id);
    public Task<UserGameDTO> UpdateUserGame(UpdateUserGameRequest request);
}
