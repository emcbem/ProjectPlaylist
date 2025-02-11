using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.DTOs.CombinationData;
using PlaylistApp.Server.DTOs.PlaystationData;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Services.PlatformGameServices;
using PlaylistApp.Server.Services.UserGameServices;

namespace PlaylistApp.Server.Services.PlaystationServices;

public class GatherNewPlaystationGamesService
{
    public List<UserGameDTO> CurrentGames = new List<UserGameDTO>();
    public List<PlaystationGameDTO> FoundGames = new List<PlaystationGameDTO>();

    private readonly IUserGameService UserGameService;
    private readonly IPlatformGameService PlatformGameService;
    private readonly PlaystationGameService PlaystationGameService;

    public GatherNewPlaystationGamesService(PlaystationGameService playstationGameService, IUserGameService userGameService, IPlatformGameService platformGameService)
    {
        PlaystationGameService = playstationGameService;
        UserGameService = userGameService;
        PlatformGameService = platformGameService;
    }

    //public Dictionary<string, int> CategoryStringsToPlatformIds { get; set; } = new Dictionary<string, int>()
    //{
    //    {"ps3", 9 },
    //    {"ps4", 48 },
    //    {"ps5", 167}
    //};


    public async Task<NewPlaystationGames> HandleBringingInNewPlaystationGames(PlaystationDTO playstationDTO)
    {
        if (playstationDTO.AccountId == null)
        {
            return new NewPlaystationGames();
        }

        CurrentGames = await UserGameService.GetUserGameByUser(playstationDTO.UserId);
        FoundGames = await PlaystationGameService.GetUserPlaystationGameList(playstationDTO.AccountId);

        if (FoundGames is null)
        {
            return new NewPlaystationGames();
        }

        ItemAction itemAction = new ItemAction();
        List<AddUserGameRequest> addUserGameRequests = new List<AddUserGameRequest>();

        var platformKeyToUserGames = CurrentGames.GroupBy(x => x.PlatformGame?.PlatformKey).ToDictionary(x => x.Key, x => x.ToList());

        if (CurrentGames is not null)
        {
            var alreadyExistsGames = CurrentGames
                .Where(x =>
                {
                    if (!string.IsNullOrEmpty(x.PlatformGame.PlatformKey) &&
                        int.TryParse(x.PlatformGame.PlatformKey, out int key))
                    {
                        //if(platformKeyToUserGames.ContainsKey(x.PlatformGame.PlatformKey))
                        //{
                        //    var gamesInDatabase = platformKeyToUserGames[x.PlatformGame.PlatformKey];
                        //    return FoundGames.Any(y => y.Id == key && gamesInDatabase.Any(z => z.PlatformGame.Platform.Id == CategoryStringsToPlatformIds[y.Category]));
                        //}
                        //else
                        //{
                            return FoundGames.Any(y => y.Id == key);

                        
                    }
                    return false;
                })
                .ToList();


            var newGames = FoundGames
                .Where(x =>
                {
                    return !alreadyExistsGames.Any(y =>
                    {
                        if (!string.IsNullOrEmpty(y.PlatformGame.PlatformKey) &&
                            int.TryParse(y.PlatformGame.PlatformKey, out int key))
                        {
                            return key == x.Id;
                        }
                        return false;
                    });
                })
                .ToList();


            foreach (var game in newGames)
            {
                var platformGame = await PlatformGameService.GetAllPlatformGamesByExternalKey(game.Id.ToString());

                if (platformGame.Count > 0)
                {
                    if (platformGame.Count > 1)
                    {
                        var options = platformGame.Select(x =>
                        {
                            return new ItemOption()
                            {
                                ErrorText = $"{x.Platform.Name}",
                                ResolveUrl = $"/action/platforms?hours={game.PlayDuration}&pgid={x.id}&user={playstationDTO.UserId}",
                                GameTitle = platformGame[0].Game.Title,
                                Hours = game.PlayDuration,
                            };
                        });

                        foreach (var option in options)
                        {
                            itemAction.ErrorType = $"Action needed, select which data to keep: ";
                            itemAction.ItemOptions.Add(option);
                        }
                    }
                    else
                    {
                        AddUserGameRequest request = new AddUserGameRequest
                        {
                            PlatformGameId = platformGame[0].id,
                            UserId = playstationDTO.UserId,
                            HoursPlayed = game.PlayDuration
                        };

                        addUserGameRequests.Add(request);
                    }
                }
            }
        }

        NewPlaystationGames newPlaystationGames = new()
        {
            AddUserGameRequests = addUserGameRequests,
            ItemAction = itemAction
        };

        return newPlaystationGames;
    }
}
