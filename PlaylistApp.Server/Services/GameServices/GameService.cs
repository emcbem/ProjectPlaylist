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
        using var context = await dbContextFactory.CreateDbContextAsync();

        var games = await context.Games.ToListAsync();

        return games.Select(x => x.ToDTO()).ToList();
    }

    public async Task<List<GameDTO>> GetAllGamesByCompany(int companyId)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var games = await context.Games
            .Where(x => x.InvolvedCompanies
                .Where(x => x.CompanyId == companyId)
                .Count() > 0)
            .ToListAsync();

        if (!games.Any())
        {
            return new List<GameDTO>();
        }

        return games.Select(x => x.ToDTO()).ToList();
    }

    public async Task<GameDTO> GetGameByID(int id)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var game = await context.Games
            .Where(x => x.Id == id)
            .FirstOrDefaultAsync();

        if (game == null)
        {
            return new GameDTO();
        }

        return game.ToDTO();
    }

    public async Task<GameDTO> GetGameByIGDB(int id)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var game = await context.Games
            .Where(x => x.IdgbId == id)
            .FirstOrDefaultAsync();

        if (game == null)
        {
            return new GameDTO();
        }

        return game.ToDTO();
    }

    public async Task<List<GameDTO>> GetGameByName(string name)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var games = await context.Games
            .Where(x => x.Title == name)
            .ToListAsync();

        return games.Select(x => x.ToDTO()).ToList();
    }
}
