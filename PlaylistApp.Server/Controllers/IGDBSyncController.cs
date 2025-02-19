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
public class IGDBSyncController
{
    private readonly SyncOrchestrator syncOrchestrator;

    public IGDBSyncController(SyncOrchestrator syncOrchestrator)
    {
        this.syncOrchestrator = syncOrchestrator;
    }

    [HttpGet("SyncCompanies")]
    public async Task SyncCompanies()
    {
        await syncOrchestrator.OrchestrateCompanies();
    }

    [HttpGet("SyncPlatforms")]
    [EndpointDescription("A way to upload the platforms from IGDB in a quick and easy way")]
    public async Task<DifferencesToCheck> SyncPlatforms()
    {
        return await syncOrchestrator.OrchestratePlatforms();
    }


    [HttpGet("SyncGenres")]
    public async Task<DifferencesToCheck> SyncGenres()
    {
        return await syncOrchestrator.OrchestrateGenres();
    }

    [HttpGet("SyncGames")]
    public async Task<DifferencesToCheck> SyncGames()
    {
        var differences =  await syncOrchestrator.OrchestrateGamesAndManyToManys();

        return differences;
    }
}
