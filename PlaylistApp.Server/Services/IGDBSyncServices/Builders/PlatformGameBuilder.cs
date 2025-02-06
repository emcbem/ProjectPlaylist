using IGDB;
using IGDB.Models;
using MimeKit.Cryptography;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.Services.IGDBSyncServices.DataGetters;
using PlaylistApp.Server.Services.IGDBSyncServices.Downloader;

namespace PlaylistApp.Server.Services.IGDBSyncServices.Builders;

public class PlatformGameBuilder
{
    private List<Website> _websites { get; set; } = new();
    public Dictionary<int, Website> WebsiteIdToWebsite { get; set; } = new();
    private List<ExternalGame> _externalGames { get; set; } = new();
    public Dictionary<int, ExternalGame> ExternalIdToExternalGame { get; set; } = new();

    private IDataGetter _dataGetter;

    public PlatformGameBuilder(IDataGetter dataGetter)
    {
        _dataGetter = dataGetter;
    }

    public async Task Setup(List<PlaylistApp.Server.Data.Game>? localGames = null)
    {
        _websites = await _dataGetter.GetWebsites();
        WebsiteIdToWebsite = _websites.ToDictionary(x => (int?)x.Id ?? 0, x => x);
        _externalGames = await _dataGetter.GetExternalGames();
        ExternalIdToExternalGame = _externalGames.ToDictionary(x => (int?)x.Id ?? 0, x => x);

        //ENDING OF WEEK DISCUSSION
        /* Heres what you need to do bud. we need the local games to be stored along with the dictionary of igdbId to the game. 
         * Once this gets made the setup is done. 
         * After setup the MakePlatformGame and MakePlatformGames methods need to get made. 
         * Once each of those are done it is time to go over back to the difference handler. 
         * There we can finally add the single difference based on if it isn't in the database.
         * Then also add all of the platform games if it is new. 
         * Possibly returning the platform games that are new incase we need to crawl steam and handle those.
         */
    }


}
