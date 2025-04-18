﻿using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;

namespace PlaylistApp.Server.Services.FriendServices;

public interface IFriendService
{
    public Task<List<UserDTO>> GetAllFriendsByBaseId(Guid userId);
    public Task<FriendDTO> GetFriendByBaseId(int id);
    public Task<FriendDTO> GetFriendById(int id);
    public Task<List<UserDTO>> GetFriendNotisList(Guid userGuid);
    public Task<List<FriendDTO>> GetBasePendingRequests(int baseId);
    public Task<bool> AddFriend(AddFriendRequest request);
    public Task<bool> AcceptFriend(AcceptFriendRequest request);
    public Task<bool> RemoveFriend(int friendId, int userId);
    public Task<bool> ToggleFriendNotis(UpdateMuteToggleRequest updateMuteToggleRequest);
}
