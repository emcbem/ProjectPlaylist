using IGDB;
using IGDB.Models;
using PlaylistApp.Server.Services.IGDBSyncServices.DataGetters;
using PlaylistApp.Server.Services.IGDBSyncServices.Downloader;

namespace PlaylistApp.Server.Services.IGDBSyncServices.Builders;

public class PlatformGameBuilder
{
    private List<Website> _websites { get; set; } = new();
    private Dictionary<int, Website> WebsiteIdToWebsite { get; set; } = new();
    //private List<>

    private IDataGetter _dataGetter;

    public PlatformGameBuilder(IDataGetter dataGetter)
    {
        _dataGetter = dataGetter;
    }

    public async Task Setup()
    {
        var websites = await _dataGetter.GetWebsites();
    }
}
