using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.GetRequests;
using PlaylistApp.Server.Services.PlatformServices;

namespace PlaylistApp.Server.Services.PlatformGameServices;

public class PlatformGameService : IPlatformGameService
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;

    public PlatformGameService(IDbContextFactory<PlaylistDbContext> dbContextFactory)
    {
        this.dbContextFactory = dbContextFactory;
    }

    public async Task<List<PlatformGameDTO>> GetAllPlatformGames(PlatformGameRequest request)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var platformGames =  await context.PlatformGames
            .Where(x => x.Game.Title.ToLower().Contains(request.Filter.ToLower()))
            .Where(x => x.PlatformId == request.PlatformID)
            .Include(x => x.Game)
            .Include(x => x.Platform)
            .ToListAsync();

        return platformGames.Select(x => x.ToDTO()).ToList();
    }

    public async Task<List<PlatformGameDTO>> GetAllPlatformGamesByGame(int gameId)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var platformGames = await context.PlatformGames
            .Where(x => x.GameId == gameId)
            .Include(x => x.Game)
            .Include(x => x.Platform)
            .ToListAsync();

        return platformGames.Select(x => x.ToDTO()).ToList();
    }
}
