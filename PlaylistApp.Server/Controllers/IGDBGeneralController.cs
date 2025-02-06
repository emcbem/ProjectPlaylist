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
using PlaylistApp.Server.Services.IGDBSyncServices.Downloader;
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
    private readonly SyncOrchestrator syncOrchestrator;

    public IGDBGeneralController(SyncOrchestrator syncOrchestrator)
    {
        this.syncOrchestrator = syncOrchestrator;
    }


    [HttpGet("SyncCompanies")]
    public async Task UploadCompanies()
    {
        await syncOrchestrator.OrchestrateCompanies();
    }

    [HttpGet("SyncPlatforms")]
    [EndpointName("Upload Platforms")]
    [EndpointDescription("A way to upload the platforms from IGDB in a quick and easy way")]
    public async Task<DifferencesToCheck> UploadPlatforms()
    {
        return await syncOrchestrator.OrchestratePlatforms();
    }


    [HttpGet("uploadPlatformsGames")]
    public async Task UploadPlatformGames()
    {
        //var gameLocalPath = await downloader.DownloadAsync(IGDBClient.Endpoints.Games);
        //var igdbGames = Parser.ParseGameCsv(gameLocalPath);
        //var externalLocalPath = await downloader.DownloadAsync(IGDBClient.Endpoints.ExternalGames);
        //var igdbExternalGames = Parser.ParseExternalGameCsv(externalLocalPath);
        //var websiteLocalPath = await downloader.DownloadAsync(IGDBClient.Endpoints.Websites);
        //var igdbWebsites = Parser.ParseWebsiteCsv(websiteLocalPath);
        //var localGames = await uploader.GetAllGames();
        //var localPlatforms = Translator.TranslateIGDBGamesIntoPersonalPlatformGameManyToMany(localGames, igdbGames, igdbExternalGames, igdbWebsites);
        //await uploader.UploadPlatformGamesToDatabase(localPlatforms);
    }

    [HttpGet("SyncGenres")]
    public async Task<DifferencesToCheck> UploadGenres()
    {
        return await syncOrchestrator.OrchestrateGenres();
    }

    [HttpGet("SyncGames")]
    public async Task<DifferencesToCheck> SyncGames()
    {
        var differences =  await syncOrchestrator.OrchestrateGamesAndManyToManys();

        return differences;
    }

    [HttpGet("uploadInvolvedCompany")]
    public async Task UploadInvolvedCompany()
    {
        //var involvedCompanyPath = await downloader.DownloadAsync(IGDBClient.Endpoints.InvolvedCompanies);
        //var igdbInvolvedCompany = Parser.ParseInvolvedCompanyCsv(involvedCompanyPath);
        //var localGames = await uploader.GetAllGames();
        //var localInvolvedCompanies = Translator.TranslateIGDBInvolvedCompaniesIntoLocalInvolvedCompanies(igdbInvolvedCompany, localGames);
        //await uploader.UploadInvolvedCompaniesToDatabase(localInvolvedCompanies);
    }

    [HttpGet("uploadGameGenres")]
    public async Task UploadGameGenres()
    {
        //var gameLocalPath = await downloader.DownloadAsync(IGDBClient.Endpoints.Games);
        //var igdbGames = Parser.ParseGameCsv(gameLocalPath);
        //var localGames = await uploader.GetAllGames();
        //var localGameGenres = Translator.TranslateIGDBGamesIntoLocalGameGenres(igdbGames, localGames);
        //await uploader.UploadGameGenres(localGameGenres);
    }
}
