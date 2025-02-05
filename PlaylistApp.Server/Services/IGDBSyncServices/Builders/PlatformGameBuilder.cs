using IGDB;
using IGDB.Models;
using PlaylistApp.Server.Services.IGDBSyncServices.Downloader;

namespace PlaylistApp.Server.Services.IGDBSyncServices.Builders;

public class PlatformGameBuilder
{
    private List<Website> _websites { get; set; } = new();
    private Dictionary<int, Website> WebsiteIdToWebsite { get; set; } = new();
    //private List<>

    private IDownloader _downloader;

    public PlatformGameBuilder(IDownloader downloader)
    {
        _downloader = downloader;
    }

    public async Task Setup()
    {
        await _downloader.DownloadAsync(IGDBClient.Endpoints.Websites);
    }
}
