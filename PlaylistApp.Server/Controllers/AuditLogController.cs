using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.GetRequests;
using PlaylistApp.Server.Services.UserGameAuditLogServices;

namespace PlaylistApp.Server.Controllers;
[ApiController]
[Route("[controller]")]
public class AuditLogController : Controller
{
	private readonly IUserGameAuditLogService userGameAuditLogService;
	public AuditLogController(IUserGameAuditLogService userGameAuditLogService)
	{
		this.userGameAuditLogService = userGameAuditLogService;
	}

	[HttpPost("addusergameauditlog")]
	public async Task<bool> AddUserGameAuditLog([FromBody] AddUserGameAuditLogRequest request)
	{
		return await userGameAuditLogService.AddUserGameAuditLog(request);
	}

	[HttpPost("getusergameauditlog")]
	public async Task<List<UserGameDTO>> GetUserGameAuditLog(GetUserGameAuditLogRequest request)
	{
		return await userGameAuditLogService.GetUserGameAuditLogByDate(request);
	}
}
