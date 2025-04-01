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
    public async Task<IResult> SyncCompanies()
    {

        if (User.IsInRole("Admin") == false)
        {
            return Results.Unauthorized();
        }

        await syncOrchestrator.OrchestrateCompanies();
        return Results.Ok();
    }

    [Authorize]
    [HttpGet("SyncPlatforms")]
    public async Task<IResult> SyncPlatforms()
    {

        if (User.IsInRole("Admin") == false)
        {
            return Results.Unauthorized();
        }

        await syncOrchestrator.OrchestratePlatforms();
        return Results.Ok();
    }

    [Authorize]
    [HttpGet("SyncGenres")]
    public async Task<IResult> SyncGenres()
    {
        if (User.IsInRole("Admin") == false)
        {
            return Results.Unauthorized();
        }
        await syncOrchestrator.OrchestrateGenres();
        return Results.Ok();
    }

    [Authorize]
    [HttpGet("SyncGames")]
    public async Task<IResult> SyncGames()
    {

        if (User.IsInRole("Admin") == false)
        {
            return Results.Unauthorized();
        }

        await syncOrchestrator.OrchestrateGamesAndManyToManys();
        return Results.Ok();
    }
}
