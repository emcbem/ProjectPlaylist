using CsvHelper;
using CsvHelper.Configuration;
using IGDB;
using IGDB.Models;
using Microsoft.AspNetCore.Authorization;
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
public class IGDBSyncController : Controller
{
    private readonly SyncOrchestrator syncOrchestrator;

    public IGDBSyncController(SyncOrchestrator syncOrchestrator)
    {
        this.syncOrchestrator = syncOrchestrator;
    }

    [Authorize]
    [HttpGet("SyncCompanies")]
    public async Task SyncCompanies()
    {
        var user = User;

        await syncOrchestrator.OrchestrateCompanies();
    }

    [Authorize]
    [HttpGet("SyncPlatforms")]
    public async Task SyncPlatforms()
    {
        var user = User;

        await syncOrchestrator.OrchestratePlatforms();
    }

    [Authorize]
    [HttpGet("SyncGenres")]
    public async Task SyncGenres()
    {
        var user = User;
         await syncOrchestrator.OrchestrateGenres();
    }

    [Authorize]
    [HttpGet("SyncGames")]
    public async Task SyncGames()
    {
        var user = User;

        await syncOrchestrator.OrchestrateGamesAndManyToManys();
    }
}
