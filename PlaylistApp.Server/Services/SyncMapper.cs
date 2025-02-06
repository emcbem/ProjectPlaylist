﻿using PlaylistApp.Server.Services.IGDBSyncServices.DataGetters;
using PlaylistApp.Server.Services.IGDBSyncServices.Downloader;
using PlaylistApp.Server.Services.IGDBSyncServices.Parsers;


namespace PlaylistApp.Server.Services
{
    public static class SyncMapper
    {
        public static void MapIGDBSyncingServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddSingleton<IIGDBParser, Parser>();
            builder.Services.AddSingleton<IDownloader, DownloadCsv>();
            builder.Services.AddSingleton<IDataGetter, IGDBDataGetter>();
        }
    }
}
