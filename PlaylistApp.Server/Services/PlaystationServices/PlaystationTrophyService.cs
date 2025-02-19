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
