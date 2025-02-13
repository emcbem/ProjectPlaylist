using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
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
        {"unk", 24},
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

    public async Task<List<ItemOption>> CompareGames(PlaystationDTO playstationDTO)
    {
        if (playstationDTO.AccountId == null)
        {
            return new List<ItemOption>();
        }

        KnownGames = await UserGameService.GetUserGameByUser(playstationDTO.UserId);
        FoundGames = await PlaystationGameService.GetUserPlaystationGameList(playstationDTO.AccountId);

        if (FoundGames is null)
        {
            return new List<ItemOption>();
        }

        ItemAction itemAction = new ItemAction();

        var options = CompareGamesHours(KnownGames, FoundGames);

        foreach (var option in options)
        {
            itemAction.ErrorType = "Hour Mismatch Error";
            itemAction.ItemOptions.Add(option);
        }

        return itemAction.ItemOptions;
    }

    public List<ItemOption> CompareGamesHours(List<UserGameDTO> knownGames, List<PlaystationGameDTO> foundGames)
    {
        var options = new List<ItemOption>();
        int counter = 0;

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
                if (playstationGame.Category is null || playstationGame.Name is null || playstationGame.PlayDuration == null)
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
                        counter++;
                        var option1 = new ItemOption
                        {
                            ErrorText = $"Playlist record: ",
                            ResolveUrl = $"/action/hours?hours={userGame.TimePlayed}&pgid={userGame.PlatformGame.id}&user={userGame.User.Guid}",
                            GameTitle = $"{userGame.PlatformGame.Game.Title}",
                            Hours = (int)userGame.TimePlayed,
                            UniqueId = $"Hour{counter}"
                        };

                        var option2 = new ItemOption
                        {
                            ErrorText = $"Playstation record: ",
                            ResolveUrl = $"/action/hours?hours={playstationGame.PlayDuration}&pgid={userGame.PlatformGame.id}&user={userGame.User.Guid}",
                            GameTitle = $"{userGame.PlatformGame.Game.Title}", 
                            Hours = playstationGame.PlayDuration,
                            UniqueId= $"Hour{counter}"
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
