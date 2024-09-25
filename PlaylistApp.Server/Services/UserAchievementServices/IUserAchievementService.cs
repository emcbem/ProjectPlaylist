﻿using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;

namespace PlaylistApp.Server.Services.UserAchievementServices;

public interface IUserAchievementService
{
    public Task<UserAchievementDTO> GetUserAchievementById(int id);
    public Task<List<UserAchievementDTO>> GetUserAchievementByUserId(Guid userId);
    public Task<List<UserAchievementDTO>> GetUserAchievementByAchievementId(int id);
    public Task<int> AddUserAchievement(AddUserAchievementRequest addRequest);
    public Task<UserAchievementDTO> UpdateUserAchievement(UpdateUserAchievementRequest updatedRequest);
    public Task<bool> DeleteUserAchievement(int id);

}