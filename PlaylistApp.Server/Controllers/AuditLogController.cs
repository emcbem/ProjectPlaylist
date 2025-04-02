using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.GetRequests;
using PlaylistApp.Server.Services.UserGameAuditLogServices;
using PlaylistApp.Server.Services.UserTrophyAuditLogServices;

namespace PlaylistApp.Server.Controllers;
[ApiController]
[Route("[controller]")]
public class AuditLogController : Controller
{
	private readonly IUserGameAuditLogService userGameAuditLogService;
	private readonly IUserTrophyAuditLogService userTrophyAuditLogService;
	public AuditLogController(IUserGameAuditLogService userGameAuditLogService, IUserTrophyAuditLogService userTrophyAuditLogService)
	{
		this.userGameAuditLogService = userGameAuditLogService;
		this.userTrophyAuditLogService = userTrophyAuditLogService;
	}

	[HttpPost("addusergameauditlog")]
	public async Task<bool> AddUserGameAuditLog([FromBody] AddUserGameAuditLogRequest request)
	{
		return await userGameAuditLogService.AddUserGameAuditLog(request);
	}

	[HttpPost("getusergameauditlog")]
	public async Task<List<GameDTO>> GetUserGameAuditLog(GetAuditLogByDateRequest request)
	{
		return await userGameAuditLogService.GetUserGamesFromUserGameAuditLogDate(request);
	}

	[HttpPost("addusertrophyauditlog")]
	public async Task<bool> AddUserTrophyAuditLog([FromBody] AddUserTrophyAuditLogRequest request)
	{
		return await userTrophyAuditLogService.AddUserTrophyAuditLog(request);
	}

	[HttpPost("getusertrophyauditlog")]
	public async Task<List<UserTrophyAuditLogDTO>> GetUserTrophyAuditLog(GetAuditLogByDateRequest request)
	{
		return await userTrophyAuditLogService.GetUserTrophyAuditLogByDate(request);
	}
}
