using IGDB;
using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.Interfaces;
using PlaylistApp.Server.Services.Game;
using PlaylistApp.Server.Services.IGDBServices;
using PlaylistApp.Server.Services.IGDBSyncServices.Downloader;

namespace PlaylistApp.Server.Services.IGDBSyncServices;

public class SyncOrchestrator
{
    private readonly DownloadCsv downloader;
    private readonly UploadData uploader;
    private readonly IGameService gameService;
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;
    private readonly DifferenceHandler differenceHandler;

    public SyncOrchestrator(DownloadCsv downloader, UploadData uploader, IGameService gameService, IDbContextFactory<PlaylistDbContext> dbContextFactory, DifferenceHandler differenceHandler)
    {
        this.downloader = downloader;
        this.uploader = uploader;
        this.gameService = gameService;
        this.dbContextFactory = dbContextFactory;
        this.differenceHandler = differenceHandler;
    }
    public async Task OrchestrateCompanies()
    {
        var companiesLocalPath = await downloader.DownloadAsync(IGDBClient.Endpoints.Companies);
        var igdbCompanies = Parser.ParseCompanyCsv(companiesLocalPath);
        var companyLogoUrl = await downloader.DownloadAsync(IGDBClient.Endpoints.CompanyLogos);
        var igdbCompanyLogos = Parser.ParseCompanyLogoCsv(companyLogoUrl);
        var localCompanies = Translator.TranslateIGDBCompaniesIntoPersonalData(igdbCompanies, igdbCompanyLogos);
        await differenceHandler.HandleCompanyDifferences(localCompanies);
    }

    public async Task<DifferencesToCheck> OrchestratePlatforms()
    {
        var platformsLocalPath = await downloader.DownloadAsync(IGDBClient.Endpoints.Platforms);
        var igdbPlatforms = Parser.ParsePlatformCsv(platformsLocalPath);
        var platformLogoUrl = await downloader.DownloadAsync(IGDBClient.Endpoints.PlatformLogos);
        var igdbPlatformLogos = Parser.ParsePlatformLogoCsv(platformLogoUrl);
        var localPlatforms = Translator.TranslateIGDBPlatformsIntoPersonalData(igdbPlatforms, igdbPlatformLogos);
        return await differenceHandler.HandlePlatformDifferences(localPlatforms);
    }

    public async Task<DifferencesToCheck> OrchestrateGenres()
    {
        var genreLocalPath = await downloader.DownloadAsync(IGDBClient.Endpoints.Genres);
        var igdbGenre = Parser.ParseGenreCsv(genreLocalPath);
        var localGenres = Translator.TranslateIGDBGenresIntoPersonalData(igdbGenre);
        return await differenceHandler.HandleGenreDifferences(localGenres);
    }

    public async Task<DifferencesToCheck> OrchestrateGamesAndManyToManys()
    {
        var gameLocalPath = await downloader.DownloadAsync(IGDBClient.Endpoints.Games);
        var igdbGames = Parser.ParseGameCsv(gameLocalPath);
        igdbGames = Strainer.StrainGames(igdbGames);
        var coverLocalPath = await downloader.DownloadAsync(IGDBClient.Endpoints.Covers);
        var igdbCovers = Parser.ParseCoverCsv(coverLocalPath);
        var ratingsLocalPath = await downloader.DownloadAsync(IGDBClient.Endpoints.AgeRating);
        var igdbRatings = Parser.ParseRatingCsv(ratingsLocalPath);
        var localGames = Translator.TranslateIGDBGamesIntoPersonalData(igdbGames, igdbCovers, igdbRatings);
        var gameDifference =  await differenceHandler.HandleGameDifferences(localGames);

        return gameDifference;
    }

    public async Task OrchestratePlatformGames(DifferencesToCheck gameDifferences, List<Data.Game> localGames)
    {
        await differenceHandler.HandlePlatformGameDifferences(gameDifferences, localGames);
    }
}
