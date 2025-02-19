using PlaylistApp.Server.DTOs.PlaystationData;
using PlaylistApp.Server.Services.PlaystationServices;

namespace PlaylistApp.Server.Services;

public static class PlaystationMapper
{
    public static void MapPlaystationServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddSingleton<PlaystationGameService>();
        builder.Services.AddSingleton<GatherNewPlaystationGamesService>();
        builder.Services.AddSingleton<AddNewPlaystationGamesService>();
        builder.Services.AddSingleton<PlaystationOrchestrator>();
        builder.Services.AddSingleton<HandlePlaystationPlatformErrorService>();
        builder.Services.AddSingleton<SyncPlaystationService>();
        builder.Services.AddSingleton<PlaystationAuthenticationService>();
        builder.Services.AddSingleton<PlaystationContext>();
        builder.Services.AddSingleton<PlaystationTrophyService>();
    }
}
