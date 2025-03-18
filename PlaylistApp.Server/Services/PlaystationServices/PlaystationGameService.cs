using PlaylistApp.Server.DTOs.PlaystationData;
using PsnApiWrapperNet;
using System.Xml;

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

    public async Task<List<PlaystationGameDTO>> GetUserPlaystationGameList(string accountId)
    {
        PAWN pawn = new(config["npsso"]);

        try
        {
            var response = await pawn.GameListAsync(accountId, offset: 0, limit: 200);

            if (response.titles.Count == 0)
            {
                return new List<PlaystationGameDTO>();
            }

            List<PlaystationGameDTO> allGames = new();

            foreach (var title in response.titles)
            {
                PlaystationGameDTO newDTO = new PlaystationGameDTO()
                {
                    FirstPlayedDateTime = title.firstPlayedDateTime,
                    Id = title.concept.id,
                    ImageUrl = title.imageUrl,
                    LastPlayedDateTime = title.lastPlayedDateTime,
                    Name = title.name,
                    PlayCount = title.playCount,
                    PlayDuration = FormatPlaystationTimePlayed(title.playDuration), 
                    Category = title.category.Substring(0, 3),
                };

                allGames.Add(newDTO);
            }

            return allGames;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Failed to get users game list. Details: {ex.Message}");
        }

        return new List<PlaystationGameDTO>();
    }

    public int FormatPlaystationTimePlayed(string playDuration)
    {
        TimeSpan timeSpan = XmlConvert.ToTimeSpan(playDuration);

        int totalMinutes = (int)timeSpan.TotalMinutes;

        return totalMinutes;
    }
}
