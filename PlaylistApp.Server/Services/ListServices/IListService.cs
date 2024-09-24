using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;

namespace PlaylistApp.Server.Services.ListServices;

public interface IListService
{
    public Task<List<ListDTO>> GetAllListByuser(Guid userId);
    public Task<int> AddList(AddListRequest request);
    public Task<ListDTO> GetListById(int Id);
    public Task<bool> DelteList(int Id);
    public Task<ListDTO> UpdateList(UpdateListRequest request);
    public Task<List<ListDTO>> GetAllListsByName(string name);
}
