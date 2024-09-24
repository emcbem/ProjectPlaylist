using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;

namespace PlaylistApp.Server.Services.PlatformServices;

public class PlatformService : IPlatformService
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;

    public PlatformService(IDbContextFactory<PlaylistDbContext> dbContextFactory)
    {
        this.dbContextFactory = dbContextFactory;
    }

    public async Task<List<PlatformDTO>> GetAllPlatforms()
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        return await context.Platforms
            .Select(x => x.ToDTO())
            .ToListAsync();
    }

    public async Task<PlatformDTO> GetPlatformById(int id)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var platform = await context.Platforms
            .Where(x => x.Id == id)
            .FirstOrDefaultAsync();

        if (platform == null)
        {
            return new PlatformDTO();
        }

        return platform.ToDTO();
    }

    public async Task<List<PlatformDTO>> GetPlatformsByName(string name)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var platforms = await context.Platforms
            .Where(x => x.PlatformName.Contains(name))
            .ToListAsync();

        return platforms.Select(x => x.ToDTO()).ToList();
    }
}
