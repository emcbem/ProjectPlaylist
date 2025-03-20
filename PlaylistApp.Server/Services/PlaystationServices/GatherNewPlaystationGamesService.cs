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

    public async Task<NewPlaystationGames> HandleBringingInNewPlaystationGames(PlaystationDTO playstationDTO)
    {
        List<ItemAction> newItemActions = new List<ItemAction>();

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

        List<AddUserGameRequest> addUserGameRequests = new List<AddUserGameRequest>();

        if (CurrentGames is not null)
        {
            var alreadyExistsGames = CurrentGames
                .Where(x =>
                    !string.IsNullOrEmpty(x.PlatformGame?.PlatformKey) &&
                    int.TryParse(x.PlatformGame.PlatformKey, out int key) &&
                    FoundGames.Any(y => y.Id == key && x.TimePlayed == y.PlayDuration))
                .ToList();

            var newGames = FoundGames
                .Where(x => !alreadyExistsGames.Any(y =>
                    !string.IsNullOrEmpty(y.PlatformGame?.PlatformKey) &&
                    int.TryParse(y.PlatformGame.PlatformKey, out int key) &&
                    key == x.Id))
                .ToList();

            var platformGameTasks = newGames.Select(game =>
                PlatformGameService.GetAllPlatformGamesByExternalKey(game.Id.ToString())).ToList();

            var platformGameResults = await Task.WhenAll(platformGameTasks);

            for (int i = 0; i < newGames.Count; i++)
            {
                var game = newGames[i];
                var platformGame = platformGameResults[i];

                if (platformGame.Count > 0)
                {
                    if (platformGame.Count > 1)
                    {
                        var itemAction = new ItemAction
                        {
                            ErrorType = "Platform Mismatch!",
                            ItemOptions = platformGame.Select(x => new ItemOption
                            {
                                ErrorText = $"{x.Platform.Name}",
                                ResolveUrl = $"/action/platforms?hours={game.PlayDuration}&pgid={x.id}&user={playstationDTO.UserId}",
                                GameTitle = x.Game.Title,
                                Hours = game.PlayDuration
                            }).ToList()
                        };

                        newItemActions.Add(itemAction);
                    }
                    else
                    {
                        addUserGameRequests.Add(new AddUserGameRequest
                        {
                            PlatformGameId = platformGame[0].id,
                            UserId = playstationDTO.UserId,
                            HoursPlayed = game.PlayDuration
                        });
                    }
                }
            }
        }

        return new NewPlaystationGames
        {
            AddUserGameRequests = addUserGameRequests,
            ItemAction = newItemActions
        };
    }

}
