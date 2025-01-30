using PlaylistApp.Server.DTOs.PlaystationData;
using PsnApiWrapperNet;
using PsnApiWrapperNet.Model;

namespace PlaylistApp.Server.Services.PlaystationServices;

public class PlaystationGameService
{
    private readonly IConfiguration config;

    public PlaystationGameService(IConfiguration configuration)
    {
        config = configuration;
    }
    public async Task<List<PlaystationUserDTO>> SearchPlayer(string userName)
    {
        PAWN pawn = new(config["npsso"]);
        List<PlaystationUserDTO> playstationUsers = new();

        try
        {
            var response = await pawn.SearchPlayerAsync(userName);

            foreach (var user in response.domainResponses)
            {

                foreach (var result in user.results)
                {
                    PlaystationUserDTO possiblePlaystationUser = new();

                    possiblePlaystationUser.AccountId = result.socialMetadata.accountId;
                    possiblePlaystationUser.OnlineId = result.socialMetadata.onlineId;
                    possiblePlaystationUser.AvatarUrl = result.socialMetadata.avatarUrl;

                    playstationUsers.Add(possiblePlaystationUser);
                }

            }

            return playstationUsers;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Failed to get user for username: {userName}. Details: {ex.Message}");
        }

        return new List<PlaystationUserDTO>();
    }

    public async Task<GameList> GetUserPlaystationGameList(string accountId, int offset = 0, int limit = 10)
    {
        PAWN pawn = new(config["npsso"]);

        try
        {
            var response = await pawn.GameListAsync(accountId);
            return response;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Failed to get users game list. Details: {ex.Message}");
        }

        return new GameList();
    }
}
