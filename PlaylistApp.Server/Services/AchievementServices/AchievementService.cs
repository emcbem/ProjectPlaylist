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

    public async Task<List<AchievementDTO>> GetAchievementsByGame(int id)
    {
        using var context = dbContextFactory.CreateDbContext();

        var result = await context.Achievements.Where(x => x.Id == id).Select(x => x.ToDTO()).ToListAsync();
        
        return result;
    }

    public async Task<AchievementDTO> GetAchievementById(int id)
    {
        using var context = dbContextFactory.CreateDbContext();

        var result = await context.Achievements.Where(x => x.Id == id).Select(x => x.ToDTO()).FirstOrDefaultAsync();

        return result;
    }

    public async Task<List<AchievementDTO>> GetAchievementsByName(string name)
    {
        using var context = dbContextFactory.CreateDbContext();

        var result = await context.Achievements.Where(x => x.AchievementName.Contains(name)).ToListAsync();

        return result.Select(x => x.ToDTO()).ToList();
    }
}
