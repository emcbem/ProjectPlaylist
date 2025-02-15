﻿using PlaylistApp.Server.Services.IGDBSyncServices.AchievementGetter;
using PlaylistApp.Server.Services.IGDBSyncServices.Builders;
using PlaylistApp.Server.Services.IGDBSyncServices.DatabaseProcessors;
using PlaylistApp.Server.Services.IGDBSyncServices.DataGetters;
using PlaylistApp.Server.Services.IGDBSyncServices.Downloader;
using PlaylistApp.Server.Services.IGDBSyncServices.Parsers;


namespace PlaylistApp.Server.Services
{
    public static class SyncMapper
    {
        public static void MapIGDBSyncingServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddSingleton<IIGDBParser, IGDBParser>();
            builder.Services.AddSingleton<IDownloader, CsvDownloader>();
            builder.Services.AddSingleton<IDataGetter, IGDBDataGetter>();
            builder.Services.AddSingleton<PlatformGameBuilder>();
            builder.Services.AddSingleton<InvolvedCompanyBuilder>();
            builder.Services.AddSingleton<IDatabaseProcessor, DatabaseProcessor>();
            builder.Services.AddSingleton<IAchievementUpdater, AchievementUpdater>();
        }
    }
}
