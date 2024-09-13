using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;

namespace PlaylistApp.Server.Services.Game;

public class GameService : IGameService
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;

    public GameService(IDbContextFactory<PlaylistDbContext> dbContextFactory)
    {
        this.dbContextFactory = dbContextFactory;
    }

    public async Task<List<GameDTO>> GetAllGames()
    {
        using var context = dbContextFactory.CreateDbContext();
        var games = await context.Games.ToListAsync();
        return games.Select(g => g.ToDTO()).ToList();
    }
}
