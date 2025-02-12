using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.DTOs.CombinationData;
using PlaylistApp.Server.DTOs.PlaystationData;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Services.PlatformGameServices;
using PlaylistApp.Server.Services.UserGameServices;

namespace PlaylistApp.Server.Services.PlaystationServices;

public class SyncPlaystationService
{
    public List<UserGameDTO> KnownGames = new List<UserGameDTO>();
    public List<PlaystationGameDTO> FoundGames = new List<PlaystationGameDTO>();

    public Dictionary<string, int> CategoryToPlatform = new Dictionary<string, int>()
    {
        {"unk", 48},
        {"ps1", 7},
        {"ps2", 8},
        {"ps3", 9},
        {"ps4", 48},
        {"ps5", 167}
    };

    private readonly IUserGameService UserGameService;
    private readonly IPlatformGameService PlatformGameService;
    private readonly PlaystationGameService PlaystationGameService;

    public SyncPlaystationService(PlaystationGameService playstationGameService, IUserGameService userGameService, IPlatformGameService platformGameService)
    {
        PlaystationGameService = playstationGameService;
        UserGameService = userGameService;
        PlatformGameService = platformGameService;
    }

    public async Task<ItemAction> CompareGames(PlaystationDTO playstationDTO)
    {
        if (playstationDTO.AccountId == null)
        {
            return new ItemAction();
        }

        KnownGames = await UserGameService.GetUserGameByUser(playstationDTO.UserId);
        FoundGames = await PlaystationGameService.GetUserPlaystationGameList(playstationDTO.AccountId);

        if (FoundGames is null)
        {
            return new ItemAction();
        }

        ItemAction itemAction = new ItemAction();

        var options = CompareGamesHours(KnownGames, FoundGames);

        foreach (var option in options)
        {
            itemAction.ErrorType = "Hour Mismatch Error";
            itemAction.ItemOptions.Add(option);
        }

        return itemAction;
    }

    public List<ItemOption> CompareGamesHours(List<UserGameDTO> knownGames, List<PlaystationGameDTO> foundGames)
    {
        var options = new List<ItemOption>();

        foreach (var userGame in knownGames)
        {
            if (userGame.PlatformGame is null || userGame.TimePlayed == null || userGame.User is null)
            {
                continue; 
            }

            foreach (var playstationGame in foundGames)
            {
                if (playstationGame.Category is null || playstationGame.Name is null || playstationGame.PlayDuration == null)
                {
                    continue; 
                }

                if (userGame.PlatformGame.PlatformKey == playstationGame.Id.ToString() &&
                    CategoryToPlatform.ContainsKey(playstationGame.Category) &&
                    CategoryToPlatform[playstationGame.Category] == userGame.PlatformGame.Platform.Id)
                {
                    if (userGame.TimePlayed != playstationGame.PlayDuration)
                    {
                        var option1 = new ItemOption
                        {
                            ErrorText = $"Hour mismatch!",
                            ResolveUrl = $"/action/hours?hours={userGame.TimePlayed}&pgid={userGame.PlatformGame.id}&user={userGame.User.Guid}",
                            GameTitle = $"{playstationGame.Name} + {userGame.PlatformGame.Platform.Name}",
                            Hours = (int)userGame.TimePlayed
                        };

                        var option2 = new ItemOption
                        {
                            ErrorText = $"Hour mismatch!",
                            ResolveUrl = $"/action/hours?hours={playstationGame.PlayDuration}&pgid={userGame.PlatformGame.id}&user={userGame.User.Guid}",
                            GameTitle = $"{playstationGame.Name} + {CategoryToPlatform[playstationGame.Category]}", 
                            Hours = playstationGame.PlayDuration  
                        };

                        options.Add(option1);
                        options.Add(option2);
                    }

                    break;
                }
            }
        }

        return options;
    }



}
