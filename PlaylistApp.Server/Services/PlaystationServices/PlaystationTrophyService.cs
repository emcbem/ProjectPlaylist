using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.DTOs.PlaystationData;
using PlaylistApp.Server.Requests.UpdateRequests;
using PlaylistApp.Server.Services.UserServices;
using PsnApiWrapperNet;
using PsnApiWrapperNet.Model;

namespace PlaylistApp.Server.Services.PlaystationServices;

public class PlaystationTrophyService
{
    private readonly IConfiguration config;
    private readonly IUserService UserService;

    public PlaystationTrophyService(IConfiguration configuration, IUserService userService)
    {
        config = configuration;
        UserService = userService;
    }

    public async Task<int> GetUserTotalEarnedPlaystationTrophies(PlaystationDTO playstationDTO)
    {
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
        UpdateUserRequest updateUserRequest = new()
        {
            Guid = playstationDTO.UserId,
            TotalTrophies = result.earnedTrophies.total
        };

        var success = await UserService.UpdateUser(updateUserRequest);
        return success;
    }
}
