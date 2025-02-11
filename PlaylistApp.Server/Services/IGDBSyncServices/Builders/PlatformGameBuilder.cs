using IGDB.Models;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.Services.IGDBServices;
using PlaylistApp.Server.Services.IGDBSyncServices.DataGetters;

namespace PlaylistApp.Server.Services.IGDBSyncServices.Builders;

public class PlatformGameBuilder
{
    private List<Website> _websites { get; set; } = new();
    public Dictionary<int, List<Website>> WebsiteIdToWebsites { get; set; } = new();
    private List<ExternalGame> _externalGames { get; set; } = new();
    public Dictionary<int, List<ExternalGame>> ExternalIdToExternalGames { get; set; } = new();
    public Dictionary<int, PlaylistApp.Server.Data.Game> IgdbIdToLocalGame { get; set; } = new();
    public Dictionary<int, PlaylistApp.Server.Data.Game> IgdbIdToDatabaseGame { get; set; } = new();

    private IDataGetter _dataGetter;

    public PlatformGameBuilder(IDataGetter dataGetter)
    {
        _dataGetter = dataGetter;
    }

    public async Task Setup(Dictionary<int, PlaylistApp.Server.Data.Game>? localGames = null, Dictionary<int, PlaylistApp.Server.Data.Game>? allGames = null)
    {
        _websites = await _dataGetter.GetWebsites();
        WebsiteIdToWebsites = _websites.GroupBy(x => (int?)x.Game.Id ?? 0).ToDictionary(x => x.Key, x => x.ToList());
        _externalGames = await _dataGetter.GetExternalGames();
        ExternalIdToExternalGames = _externalGames.GroupBy(x => (int?)x.Game.Id ?? 0).ToDictionary(x => x.Key, x => x.ToList());

        if (localGames != null && allGames != null)
        {
            IgdbIdToLocalGame = localGames;
            IgdbIdToDatabaseGame = allGames;
        }


        //ENDING OF WEEK DISCUSSION
        /* Heres what you need to do bud. we need the local games to be stored along with the dictionary of igdbId to the game.  DONE
         * Once this gets made the setup is done. 
         * After setup the MakePlatformGame and MakePlatformGames methods need to get made. DONE
         * Once each of those are done it is time to go over back to the difference handler. 
         * There we can finally add the single difference based on if it isn't in the database.
         * Then also add all of the platform games if it is new. 
         * Possibly returning the platform games that are new incase we need to crawl steam and handle those.
         */
    }

    public PlatformGame? MakePlatformGame(int gameIgdbId, int platformId)
    {
        if (!IgdbIdToLocalGame.ContainsKey(gameIgdbId) || !IgdbIdToDatabaseGame.ContainsKey(gameIgdbId))
        {
            return null;
        }

        if(Strainer.FlaggedPlatforms.Contains(platformId))
        {
            return null;
        }

        var actualGame = IgdbIdToDatabaseGame[gameIgdbId];

        var platformGame = new PlatformGame
        {
            GameId = actualGame.Id,
            PlatformId = platformId,
        };

        if (WebsiteIdToWebsites.TryGetValue(gameIgdbId, out var websites))
        {
            platformGame.PlatformUrl = websites
                .FirstOrDefault(w => w?.Category == WebsiteCategory.Official)?.Url;
        }

        if (ExternalIdToExternalGames.TryGetValue(gameIgdbId, out var externalCategories))
        {
            platformGame.PlatformKey = externalCategories
                .FirstOrDefault(e => e?.Platform.Id == platformId)?.Uid;
        }

        return platformGame;

    }

    public List<PlatformGame>? MakePlatfromGames(int gameIgdbId)
    {
        if (!IgdbIdToLocalGame.ContainsKey(gameIgdbId) || !IgdbIdToDatabaseGame.ContainsKey(gameIgdbId))
        {
            return null;
        }

        var localGame = IgdbIdToLocalGame[gameIgdbId];

        List<PlatformGame> platforms = new();
        foreach (var platformId in localGame.PlatformIds)
        {
            var possiblePlatformGame = MakePlatformGame(gameIgdbId, platformId);
            if (possiblePlatformGame != null)
            {
                platforms.Add(possiblePlatformGame);
            }
        }
        return platforms;
    }



}
