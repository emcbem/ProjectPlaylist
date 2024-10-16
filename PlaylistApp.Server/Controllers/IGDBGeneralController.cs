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

    public IGDBGeneralController(DownloadCsv downloader, UploadData uploader, IGameService gameService)
    {
        this.downloader = downloader;
        this.uploader = uploader;
        this.gameService = gameService;
    }

    //Don't uncomment unless you need to reseed the database with games!

    [HttpGet("Upload Games")]
    public async Task UploadGames()
    {
        var gameLocalPath = await downloader.DownloadCSV(IGDBClient.Endpoints.Games);
        var igdbGames = Parser.ParseGameCsv(gameLocalPath);
        var coverLocalPath = await downloader.DownloadCSV(IGDBClient.Endpoints.Covers);
        var igdbCovers = Parser.ParseCoverCsv(coverLocalPath);
        var ageRatingLocalPath = await downloader.DownloadCSV(IGDBClient.Endpoints.AgeRating);
        var igdbRatings = Parser.ParseRatingCsv(ageRatingLocalPath);
        var localGames = Translator.TranslateIGDBGamesIntoPersonalData(igdbGames, igdbCovers, igdbRatings);
        await uploader.UploadGamesToDatabase(localGames);
    }

    [HttpGet("Upload Companies")]
    public async Task UploadCompanies()
    {
        var companiesLocalPath = await downloader.DownloadCSV(IGDBClient.Endpoints.Companies);
        var igdbCompanies = Parser.ParseCompanyCsv(companiesLocalPath);
        var companyLogoUrl = await downloader.DownloadCSV(IGDBClient.Endpoints.CompanyLogos);
        var igdbCompanyLogos = Parser.ParseCompanyLogoCsv(companyLogoUrl);
        var localCompanies = Translator.TranslateIGDBCompaniesIntoPersonalData(igdbCompanies, igdbCompanyLogos);
        var test = localCompanies.GroupBy(x => x.Id).Where(x => x.Count() > 1).ToList();
        await uploader.UploadCompaniesToDatabase(localCompanies);
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
