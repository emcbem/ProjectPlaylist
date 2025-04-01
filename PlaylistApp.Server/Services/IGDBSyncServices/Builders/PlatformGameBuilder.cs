using IGDB.Models;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.Services.IGDBServices;
using PlaylistApp.Server.Services.IGDBSyncServices.DataGetters;

namespace PlaylistApp.Server.Services.IGDBSyncServices.Builders;

public class PlatformGameBuilder
{
    private List<Website>? _websites { get; set; } = new();
    public Dictionary<int, List<Website>>? WebsiteIdToWebsites { get; set; } = new();
    private List<ExternalGame>? _externalGames { get; set; } = new();
    public Dictionary<int, List<ExternalGame>>? ExternalIdToExternalGames { get; set; } = new();
    public Dictionary<int, PlaylistApp.Server.Data.Game>? IgdbIdToLocalGame { get; set; } = new();
    public Dictionary<int, PlaylistApp.Server.Data.Game>? IgdbIdToDatabaseGame { get; set; } = new();

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
    }

    public PlatformGame? MakePlatformGame(int gameIgdbId, int platformId)
    {
        if(IgdbIdToLocalGame is null || IgdbIdToDatabaseGame is null || WebsiteIdToWebsites is null || ExternalIdToExternalGames is null)
        {
            return null;
        }

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
        if(IgdbIdToDatabaseGame is null || IgdbIdToLocalGame is null)
        {
            return [];
        }

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

    public void Dispose()
    {
        _websites = null;
        WebsiteIdToWebsites = null;
        _externalGames = null;
        ExternalIdToExternalGames = null;
        IgdbIdToLocalGame = null;
        IgdbIdToDatabaseGame = null;
        GC.Collect();
    }



}
