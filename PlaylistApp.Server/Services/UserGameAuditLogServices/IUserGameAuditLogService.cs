﻿using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.GetRequests;

namespace PlaylistApp.Server.Services.UserGameAuditLogServices;

public interface IUserGameAuditLogService
{
    public Task<bool> AddUserGameAuditLog(AddUserGameAuditLogRequest request);
    public Task<List<GameDTO>> GetUserGamesFromUserGameAuditLogDate(GetAuditLogByDateRequest request);
    public Task<List<UserGameAuditLogDTO>> GetAllUserGameAuditLogsByDate(GetAuditLogByDateRequest request);
}
