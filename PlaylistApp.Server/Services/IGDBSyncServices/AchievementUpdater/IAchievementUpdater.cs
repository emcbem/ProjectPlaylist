using PlaylistApp.Server.Data;

namespace PlaylistApp.Server.Services.IGDBSyncServices.AchievementGetter;

public interface IAchievementUpdater
{
    public Task UpdatePlatformGames(List<PlatformGame> platformGames);
}
