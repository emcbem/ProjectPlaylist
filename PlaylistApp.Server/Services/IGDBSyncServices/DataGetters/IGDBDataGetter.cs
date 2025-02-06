using IGDB;
using IGDB.Models;
using PlaylistApp.Server.Services.IGDBSyncServices.Downloader;
using PlaylistApp.Server.Services.IGDBSyncServices.Parsers;

namespace PlaylistApp.Server.Services.IGDBSyncServices.DataGetters;

public class IGDBDataGetter : IDataGetter
{
    private readonly IDownloader downloader;
    private readonly IIGDBParser igdbParser;

    public IGDBDataGetter(IDownloader downloader, IIGDBParser igdbParser)
    {
        this.downloader = downloader;
        this.igdbParser = igdbParser;
    }

    public async Task<List<CompanyLogo>> GetCompanyLogos()
    {
        var companyLogoLocalPath = await downloader.DownloadAsync(IGDBClient.Endpoints.CompanyLogos);
        return igdbParser.ParseCompanyLogoCsv(companyLogoLocalPath);
    }

    public async Task<List<Company>> GetCompanys()
    {
        var companyLocalPath = await downloader.DownloadAsync(IGDBClient.Endpoints.Companies);
        return igdbParser.ParseCompanyCsv(companyLocalPath);
    }

    public async Task<List<Cover>> GetCovers()
    {
        var coversLocalPath = await downloader.DownloadAsync(IGDBClient.Endpoints.Covers);
        return igdbParser.ParseCoverCsv(coversLocalPath);
    }

    public async Task<List<ExternalGame>> GetExternalGames()
    {
        var externalGamesLocalPath = await downloader.DownloadAsync(IGDBClient.Endpoints.ExternalGames);
        return igdbParser.ParseExternalGameCsv(externalGamesLocalPath);
    }

    public async Task<List<IGDB.Models.Game>> GetGames()
    {
        var gameLocalPath = await downloader.DownloadAsync(IGDBClient.Endpoints.Games);
        return igdbParser.ParseGameCsv(gameLocalPath);
    }

    public async Task<List<Genre>> GetGenres()
    {
        var genreLocalPath = await downloader.DownloadAsync(IGDBClient.Endpoints.Genres);
        return igdbParser.ParseGenreCsv(genreLocalPath);
    }

    public async Task<List<InvolvedCompany>> GetInvolvedCompanys()
    {
        var involvedCompanyLocalPath = await downloader.DownloadAsync(IGDBClient.Endpoints.InvolvedCompanies);
        return igdbParser.ParseInvolvedCompanyCsv(involvedCompanyLocalPath);
    }

    public async Task<List<PlatformLogo>> GetPlatformLogos()
    {
        var platformLogoLocalPath = await downloader.DownloadAsync(IGDBClient.Endpoints.PlatformLogos);
        return igdbParser.ParsePlatformLogoCsv(platformLogoLocalPath);
    }

    public async Task<List<Platform>> GetPlatforms()
    {
        var platformLocalPath = await downloader.DownloadAsync(IGDBClient.Endpoints.Platforms);
        return igdbParser.ParsePlatformCsv(platformLocalPath);
    }

    public async Task<List<AgeRating>> GetRatings()
    {
        var ratingLocalPath = await downloader.DownloadAsync(IGDBClient.Endpoints.AgeRating);
        return igdbParser.ParseRatingCsv(ratingLocalPath);
    }

    public async Task<List<Website>> GetWebsites()
    {
        var websiteLocalPath = await downloader.DownloadAsync(IGDBClient.Endpoints.Websites);
        return igdbParser.ParseWebsiteCsv(websiteLocalPath);
    }
}
