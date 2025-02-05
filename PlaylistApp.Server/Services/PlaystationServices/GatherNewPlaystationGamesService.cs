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

        if (CurrentGames is not null && FoundGames is not null)
        {
            var alreadyExistsGames = CurrentGames
                .Where(x =>
                {
                    if (!string.IsNullOrEmpty(x.PlatformGame.PlatformKey) &&
                        int.TryParse(x.PlatformGame.PlatformKey, out int key))
                    {
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
                                ResolveUrl = $"/action/platforms/?hours={game.PlayDuration}&pgid={x.id}&user={playstationDTO.UserId}",
                                GameTitle = platformGame[0].Game.Title,
                            };
                        });

                        foreach (var option in options)
                        {
                            itemAction.ErrorType = $"Multiple platforms found these games";
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
