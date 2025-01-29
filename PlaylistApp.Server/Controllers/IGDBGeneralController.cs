using CsvHelper;
using CsvHelper.Configuration;
using IGDB;
using IGDB.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing.Constraints;
using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.Services.Game;
using PlaylistApp.Server.Services.IGDBServices;
using PlaylistApp.Server.Services.IGDBSyncServices;
using System;
using System.Formats.Asn1;
using System.Globalization;
using System.Net.WebSockets;
using System.Reflection.Metadata.Ecma335;
using System.Reflection.PortableExecutable;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class IGDBGeneralController
{
    private readonly DownloadCsv downloader;
    private readonly UploadData uploader;
    private readonly IGameService gameService;
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;
    private readonly SyncOrchestrator syncOrchestrator;

    public IGDBGeneralController(DownloadCsv downloader, UploadData uploader, IGameService gameService, IDbContextFactory<PlaylistDbContext> dbContextFactory, SyncOrchestrator syncOrchestrator)
    {
        this.downloader = downloader;
        this.uploader = uploader;
        this.gameService = gameService;
        this.dbContextFactory = dbContextFactory;
        this.syncOrchestrator = syncOrchestrator;
    }

    //Don't uncomment unless you need to reseed the database with games!
    [HttpGet]
    public async Task AddChecksums()
    {
        //var companiesLocalPath = await downloader.DownloadCSV(IGDBClient.Endpoints.Companies);
        //var igdbCompanies = Parser.ParseCompanyCsv(companiesLocalPath);
        //var NamesToChecksum = igdbCompanies
        //.GroupBy(x => x.Name)
        //.Select(g => g.First()) // Keep only the first entry for each name
        //.ToDictionary(x => x.Name, x => (x.Checksum, x.Id));

        ////var platformsLocalPath = await downloader.DownloadCSV(IGDBClient.Endpoints.Platforms);
        ////var igdbPlatforms = Parser.ParsePlatformCsv(platformsLocalPath);
        ////var NamesToChecksum = igdbPlatforms
        ////.GroupBy(x => x.Name)
        ////.Select(g => g.First()) // Keep only the first entry for each name
        ////.ToDictionary(x => x.Name, x => (x.Checksum, x.Id));

        ////var genreLocalPath = await downloader.DownloadCSV(IGDBClient.Endpoints.Genres);
        ////var igdbGenres = Parser.ParseGenreCsv(genreLocalPath);
        ////var NamesToChecksum = igdbGenres
        ////.GroupBy(x => x.Name)
        ////.Select(g => g.First()) // Keep only the first entry for each name
        ////.ToDictionary(x => x.Name, x => (x.Checksum, x.Id));

        ////var gameLocalPath = await downloader.DownloadCSV(IGDBClient.Endpoints.Games);
        ////var igdbgames = Parser.ParseGameCsv(gameLocalPath);
        ////var igdbGameToChecksum = igdbgames.ToDictionary(x => (int?)x?.Id ?? 0, x => x.Checksum);

        //var context = await dbContextFactory.CreateDbContextAsync();

        //var companies = await context.Companies.ToListAsync();

        ////platforms.ForEach(x =>
        ////{
        ////    if (platNamesToChecksum.ContainsKey(x.PlatformName))
        ////    {
        ////        x.Checksum = platNamesToChecksum[x.PlatformName];
        ////        context.Platforms.Update(x);
        ////    }
        ////});


        //companies.ForEach(x =>
        //{
        //    if(NamesToChecksum.ContainsKey(x.CompanyName))
        //    {
        //        x.Checksum = NamesToChecksum[x.CompanyName].Checksum;
        //        x.IgdbId = (int?)NamesToChecksum[x.CompanyName].Id;
        //        context.Companies.Update(x);
        //    }
        //});

        //await context.SaveChangesAsync();


        ////var genres = await context.Genres.ToListAsync();
        //var games = await context.Games.ToListAsync();
        ////var platforms = await context.Platforms.ToListAsync();

        //var gamesToRemove = new List<Data.Game>();
        //var gamesToChange = new List<Data.Game>();

        //games.ForEach(x =>
        //{
        //    if (!igdbGameToChecksum.ContainsKey(x?.IdgbId ?? 0))
        //    {
        //        gamesToRemove.Add(x);
        //    }
        //    else
        //    {
        //        x.Checksum = igdbGameToChecksum[x.IdgbId ?? 0];
        //        gamesToChange.Add(x);
        //    }
        //}
        //);

        ////context.Games.UpdateRange(gamesToChange);
        //context.Games.RemoveRange(gamesToRemove);
        //await context.SaveChangesAsync();


        //return gamesToRemove;



    }

    [HttpGet("Sync Companies")]
    public async Task<DifferencesToCheck> UploadCompanies()
    {
        return await syncOrchestrator.OrchestrateCompanies();
    }

    [HttpGet("uploadPlatforms")]
    [EndpointName("Upload Platforms")]
    [EndpointDescription("A way to upload the platforms from IGDB in a quick and easy way")]
    public async Task UploadPlatforms()
    {
        var platformsLocalPath = await downloader.DownloadCSV(IGDBClient.Endpoints.Platforms);
        var igdbPlatforms = Parser.ParsePlatformCsv(platformsLocalPath);
        var platformLogoUrl = await downloader.DownloadCSV(IGDBClient.Endpoints.PlatformLogos);
        var igdbPlatformLogos = Parser.ParsePlatformLogoCsv(platformLogoUrl);
        var localPlatforms = Translator.TranslateIGDBPlatformsIntoPersonalData(igdbPlatforms, igdbPlatformLogos);
        await uploader.UploadPlatformsToDatabase(localPlatforms);
    }


    [HttpGet("uploadPlatformsGames")]
    public async Task UploadPlatformGames()
    {
        var gameLocalPath = await downloader.DownloadCSV(IGDBClient.Endpoints.Games);
        var igdbGames = Parser.ParseGameCsv(gameLocalPath);
        var externalLocalPath = await downloader.DownloadCSV(IGDBClient.Endpoints.ExternalGames);
        var igdbExternalGames = Parser.ParseExternalGameCsv(externalLocalPath);
        var websiteLocalPath = await downloader.DownloadCSV(IGDBClient.Endpoints.Websites);
        var igdbWebsites = Parser.ParseWebsiteCsv(websiteLocalPath);
        var localGames = await uploader.GetAllGames();
        var localPlatforms = Translator.TranslateIGDBGamesIntoPersonalPlatformGameManyToMany(localGames, igdbGames, igdbExternalGames, igdbWebsites);
        await uploader.UploadPlatformGamesToDatabase(localPlatforms);
    }

    [HttpGet("uploadGenres")]
    public async Task UploadGenres()
    {
        var genreLocalPath = await downloader.DownloadCSV(IGDBClient.Endpoints.Genres);
        var igdbGenre = Parser.ParseGenreCsv(genreLocalPath);
        var localGenres = Translator.TranslateIGDBGenresIntoPersonalData(igdbGenre);
        await uploader.UploadGenresToDatabase(localGenres);
    }

    [HttpGet("uploadInvolvedCompany")]
    public async Task UploadInvolvedCompany()
    {
        var involvedCompanyPath = await downloader.DownloadCSV(IGDBClient.Endpoints.InvolvedCompanies);
        var igdbInvolvedCompany = Parser.ParseInvolvedCompanyCsv(involvedCompanyPath);
        var localGames = await uploader.GetAllGames();
        var localInvolvedCompanies = Translator.TranslateIGDBInvolvedCompaniesIntoLocalInvolvedCompanies(igdbInvolvedCompany, localGames);
        await uploader.UploadInvolvedCompaniesToDatabase(localInvolvedCompanies);
    }

    [HttpGet("uploadGameGenres")]
    public async Task UploadGameGenres()
    {
        var gameLocalPath = await downloader.DownloadCSV(IGDBClient.Endpoints.Games);
        var igdbGames = Parser.ParseGameCsv(gameLocalPath);
        var localGames = await uploader.GetAllGames();
        var localGameGenres = Translator.TranslateIGDBGamesIntoLocalGameGenres(igdbGames, localGames);
        await uploader.UploadGameGenres(localGameGenres);
    }
}
