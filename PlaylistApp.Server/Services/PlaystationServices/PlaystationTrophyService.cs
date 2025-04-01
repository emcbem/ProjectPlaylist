using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.DTOs.PlaystationData;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;
using PlaylistApp.Server.Services.UserServices;
using PlaylistApp.Server.Services.UserTrophyAuditLogServices;
using PsnApiWrapperNet;
using PsnApiWrapperNet.Model;

namespace PlaylistApp.Server.Services.PlaystationServices;

public class PlaystationTrophyService
{
    private readonly IConfiguration config;
    private readonly IUserService UserService;
    private readonly IUserTrophyAuditLogService userTrophyAuditLogService;

    public PlaystationTrophyService(IConfiguration configuration, IUserService userService, IUserTrophyAuditLogService userTrophyAuditLogService)
    {
        config = configuration;
        UserService = userService;
        this.userTrophyAuditLogService = userTrophyAuditLogService;
    }

    public async Task<int> GetUserTotalEarnedPlaystationTrophies(PlaystationDTO playstationDTO)
    {
        if (playstationDTO is null)
        {
            return 0;
        }

        PAWN pawn = new(config["npsso"]);

        var result = await pawn.PlayerSummaryAsync(playstationDTO.AccountId);

        UserDTO user = await GenerateUpdateUserRequest(playstationDTO, result);

        if (user.TotalTrophies != 0)
        {
            return result.earnedTrophies.total;
        }

        return user.TotalTrophies;
    }

    private async Task<UserDTO> GenerateUpdateUserRequest(PlaystationDTO playstationDTO, PlayerSummary result)
    {
        if (playstationDTO is null || result is null)
        {
            return new UserDTO();
        }

        UpdateUserRequest updateUserRequest = new()
        {
            Guid = playstationDTO.UserId,
            TotalTrophies = result.earnedTrophies.total
        };

        var possibleUser = await UserService.GetAuditUser(playstationDTO.UserId);

        if (possibleUser is null)
        {
            return new UserDTO();
        }

        var addUserTrophyAuditLogRequest = new AddUserTrophyAuditLogRequest
        {
            TrophiesBefore = possibleUser.TotalTrophies,
            TrophiesAfter = result.earnedTrophies.total,
            UserId = playstationDTO.UserId
        };

        await userTrophyAuditLogService.AddUserTrophyAuditLog(addUserTrophyAuditLogRequest);
        var success = await UserService.UpdateUser(updateUserRequest);

        return success;
    }

    public async Task<TrophyTitles> RetrieveTrophyTitlesForUser(PlaystationDTO playstationDTO)
    {
        PAWN pawn = new(config["npsso"]);

        var result = await pawn.PlayerTrophyTitlesAsync(playstationDTO.AccountId, 0, 800);

        return result;
    }
    public async Task<Trophies> RetrieveTrophiesEarnedForTitle(PlaystationDTO playstationDTO)
    {
        PAWN pawn = new(config["npsso"]);

        var result = await pawn.PlayerTrophiesAsync(playstationDTO.AccountId, "NPWR28289_00", "all", "trophy2");

        return result;
    }

    public async Task<Trophies> FindTrophiesForPlaystationTitle()
    {
        PAWN pawn = new(config["npsso"]);

        var result = await pawn.TitleTrophiesAsync("NPWR28289_00", "all", "trophy2");

        return result;
    }

}
