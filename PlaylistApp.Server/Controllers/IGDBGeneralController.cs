using CsvHelper;
using CsvHelper.Configuration;
using IGDB;
using IGDB.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing.Constraints;
using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.Services.IGDBServices;
using System;
using System.Formats.Asn1;
using System.Globalization;
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

    public IGDBGeneralController(DownloadCsv downloader, UploadData uploader)
    {
        this.downloader = downloader;
        this.uploader = uploader;
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
        var platformsLocalPath = await downloader.DownloadCSV(IGDBClient.Endpoints.Platforms);
        var igdbPlatforms = Parser.ParsePlatformCsv(platformsLocalPath);
        var platformLogoUrl = await downloader.DownloadCSV(IGDBClient.Endpoints.PlatformLogos);
        var igdbPlatformLogos = Parser.ParsePlatformLogoCsv(platformLogoUrl);
        var localPlatforms = Translator.TranslateIGDBPlatformsIntoPersonalData(igdbPlatforms, igdbPlatformLogos);
        await uploader.UploadPlatformsToDatabase(localPlatforms);
    }
}
