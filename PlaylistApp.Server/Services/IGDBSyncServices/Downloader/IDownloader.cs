namespace PlaylistApp.Server.Services.IGDBSyncServices.Downloader;

public interface IDownloader
{
    Task<string> DownloadAsync(string endpoint);
}
