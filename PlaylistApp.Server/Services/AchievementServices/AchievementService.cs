using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;

namespace PlaylistApp.Server.Services.Achievement;

public class AchievementService : IAchievementService
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;

    public AchievementService(IDbContextFactory<PlaylistDbContext> dbContextFactory)
    {
        this.dbContextFactory = dbContextFactory;
    }

    public async Task<List<AchievementDTO>> GetAchievementsByGame(int platformGameId)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var result = await context.Achievements
            .Include(x => x.PlatformGame)
                .ThenInclude(x => x.Platform)
             .Include(x => x.PlatformGame)
                .ThenInclude(x => x.Game)
            .Where(x => x.PlatformGameId == platformGameId)
            .ToListAsync();

        return result.Select(x => x.ToDTO()).ToList();
    }

    public async Task<AchievementDTO> GetAchievementById(int id)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var result = await context.Achievements
            .Include(x => x.PlatformGame)
                .ThenInclude(x => x.Game)
            .Include(x => x.PlatformGame)
                .ThenInclude(x => x.Platform)
            .Where(x => x.Id == id)
            .FirstOrDefaultAsync();

        if (result == null)
        {
            return new AchievementDTO();
        }

        return result.ToDTO();
    }

    public async Task<List<AchievementDTO>> GetAchievementsByName(string name)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var result = await context.Achievements
             .Include(x => x.PlatformGame)
                .ThenInclude(x => x.Game)
            .Include(x => x.PlatformGame)
                .ThenInclude(x => x.Platform)
            .Where(x => x.AchievementName.Contains(name))
            .ToListAsync();

        if (!result.Any())
        {
            return new List<AchievementDTO>();
        }

        return result.Select(x => x.ToDTO()).ToList();
    }
}
