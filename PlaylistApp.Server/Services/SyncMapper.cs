using PlaylistApp.Server.Services.IGDBSyncServices;
using PlaylistApp.Server.Services.IGDBSyncServices.AchievementGetter;
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
            builder.Services.AddTransient<IIGDBParser, IGDBParser>();
            builder.Services.AddTransient<IDownloader, CsvDownloader>();
            builder.Services.AddTransient<IDataGetter, IGDBDataGetter>();
            builder.Services.AddTransient<PlatformGameBuilder>();
            builder.Services.AddTransient<InvolvedCompanyBuilder>();
            builder.Services.AddTransient<IDatabaseProcessor, DatabaseProcessor>();
            builder.Services.AddTransient<IAchievementUpdater, AchievementUpdater>();
            builder.Services.AddTransient<SyncOrchestrator>();
            builder.Services.AddTransient<DifferenceHandler>();
        }
    }
}
