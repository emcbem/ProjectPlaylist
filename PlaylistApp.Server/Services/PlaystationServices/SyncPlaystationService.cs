using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.DTOs.PlaystationData;
using PlaylistApp.Server.Requests.UpdateRequests;
using PlaylistApp.Server.Services.UserGameServices;

namespace PlaylistApp.Server.Services.PlaystationServices;

public class SyncPlaystationService
{
    private readonly IUserGameService UserGameService;
    private readonly PlaystationGameService PlaystationGameService;
    public SyncPlaystationService(PlaystationGameService playstationGameService, IUserGameService userGameService)
    {
        PlaystationGameService = playstationGameService;
        UserGameService = userGameService;
    }

    public List<UserGameDTO> KnownGames = new List<UserGameDTO>();
    public List<PlaystationGameDTO> FoundGames = new List<PlaystationGameDTO>();

    public Dictionary<string, int> CategoryToPlatform = new Dictionary<string, int>()
    {
        {"unk", 24},
        {"ps1", 7},
        {"ps2", 8},
        {"ps3", 9},
        {"ps4", 48},
        {"ps5", 167}
    };


    public async Task<List<UpdateUserGameRequest>> CompareGames(PlaystationDTO playstationDTO)
    {
        if (playstationDTO.AccountId == null)
        {
            return new List<UpdateUserGameRequest>();
        }

        KnownGames = await UserGameService.GetUserGameByUser(playstationDTO.UserId);
        FoundGames = await PlaystationGameService.GetUserPlaystationGameList(playstationDTO.AccountId);

        if (FoundGames is null)
        {
            return new List<UpdateUserGameRequest>();
        }

        var newItemActions = CompareGamesHours(KnownGames, FoundGames);

        return newItemActions;
    }

    public List<UpdateUserGameRequest> CompareGamesHours(List<UserGameDTO> knownGames, List<PlaystationGameDTO> foundGames)
    {
        List<UpdateUserGameRequest> updateUserGameRequests = new();

        var orderedGames = foundGames.OrderBy(x => x.Name);

        var mergedGames = foundGames.GroupBy(x => new { x.Name, x.Category }).Select(x =>
        {
            var multiGames = x.ToList();
            return multiGames.Aggregate((x, y) =>
            {
                return new PlaystationGameDTO()
                {
                    Category = x.Category,
                    FirstPlayedDateTime = (x.FirstPlayedDateTime < y.FirstPlayedDateTime ? x.FirstPlayedDateTime : y.FirstPlayedDateTime),
                    LastPlayedDateTime = (x.LastPlayedDateTime > y.LastPlayedDateTime ? x.LastPlayedDateTime : y.LastPlayedDateTime),
                    Id = x.Id,
                    ImageUrl = x.ImageUrl,
                    Name = x.Name,
                    PlayCount = x.PlayCount + y.PlayCount,
                    PlayDuration = x.PlayDuration + y.PlayDuration
                };
            });
        });

        foreach (var userGame in knownGames)
        {
            if (userGame.PlatformGame is null || userGame.TimePlayed == null || userGame.User is null)
            {
                continue; 
            }

            foreach (var playstationGame in mergedGames)
            {
                if (playstationGame.Category is null || playstationGame.Name is null || playstationGame.PlayDuration < 0)
                {
                    continue; 
                }

                if (userGame.PlatformGame.PlatformKey == playstationGame.Id.ToString() &&
                    CategoryToPlatform.ContainsKey(playstationGame.Category) &&
                    CategoryToPlatform[playstationGame.Category] == userGame.PlatformGame.Platform.Id &&
                    KnownGames.All(x => x.TimePlayed != playstationGame.PlayDuration))
                {
                    if (userGame.TimePlayed != playstationGame.PlayDuration)
                    {
                        var updateRequest = new UpdateUserGameRequest
                        {
                            TimePlayed = playstationGame.PlayDuration, 
                            UserGameId = userGame.UserGameId
                        };

                        updateUserGameRequests.Add(updateRequest);
                    }

                    break;
                }
            }
        }

        return updateUserGameRequests;
    }
}
