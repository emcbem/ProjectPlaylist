﻿using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;

namespace PlaylistApp.Server.Services.ListServices;

public interface IListService
{
    public Task<List<ListDTO>> GetAllListsByUser(Guid userId);
    public Task<int> AddList(AddListRequest request);
    public Task<ListDTO> GetListById(int Id);
    public Task<Data.List> GetActualListById(int id);
    public Task<bool> DeleteList(int Id);
    public Task<ListDTO> UpdateList(UpdateListRequest request);
    public Task<List<ListDTO>> GetAllListsByName(string name);
}
