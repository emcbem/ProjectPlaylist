using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.DTOs.CombinationData;
using PlaylistApp.Server.DTOs.PlaystationData;
using PlaylistApp.Server.DTOs.SteamData;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Services.PlatformGameServices;
using PlaylistApp.Server.Services.UserGameServices;

namespace PlaylistApp.Server.Services.PlaystationServices;

public class PlaystationComparerService
{
    public List<UserGameDTO> CurrentGames = new List<UserGameDTO>();
    public List<PlaystationGameDTO> FoundGames = new List<PlaystationGameDTO>();

    private readonly UserGameService UserGameService;
    private readonly PlaystationGameService PlaystationGameService;
    private readonly PlatformGameService PlatformGameService;

    public PlaystationComparerService(PlaystationGameService playstationGameService, UserGameService userGameService, PlatformGameService platformGameService)
    {
        PlaystationGameService = playstationGameService;
        UserGameService = userGameService;
        PlatformGameService = platformGameService;
    }

    //public async Task<List<ItemAction>> CompareGames(Guid userId, string accountId)
    //{
    //    CurrentGames = await UserGameService.GetUserGameByUser(userId);
    //    FoundGames = await PlaystationGameService.GetUserPlaystationGameList(accountId);

    //    List<ItemAction> items = new List<ItemAction>();

    //    if (CurrentGames is not null && FoundGames is not null)
    //    {
    //        var alreadyExistsGames = CurrentGames
    //            .Where(x => FoundGames.Any(y => y.Id == int.Parse(x.PlatformGame.PlatformKey)))
    //            .ToList();

    //        var newGames = FoundGames
    //            .Where(x => !alreadyExistsGames.Any(y => int.Parse(y.PlatformGame.PlatformKey) == x.Id))
    //            .ToList();

    //        foreach (var game in newGames)
    //        {
    //            var platformGame = await PlatformGameService.GetAllPlatformGamesByExternalKey(game.Id.ToString());

    //            if (platformGame.Count > 1)
    //            {
    //                var newItemOption = new ItemOption
    //                {
    //                    ErrorText = "Multiple platforms found for game",
    //                    ResolveUrl = $"/action/platorms/?hours={}?pgid={}?user={}"
    //                };
    //            }
    //        }


    //    }
    //}
}
