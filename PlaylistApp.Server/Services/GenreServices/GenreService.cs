using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;

namespace PlaylistApp.Server.Services.GenreServices;

public class GenreService : IGenreService
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;

    public GenreService(IDbContextFactory<PlaylistDbContext> dbContextFactory)
    {
        this.dbContextFactory = dbContextFactory;
    }

    public async Task<List<GenreDTO>> GetAllGenres()
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var allGenres = await context.Genres.ToListAsync();

        if (!allGenres.Any())
        {
            return new List<GenreDTO>();
        }

        return allGenres.Select(x => x.ToDTO()).ToList();   
    }

    public async Task<GenreDTO> GetGenreById(int GenreId)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var genre = await context.Genres
            .Where(x => x.Id == GenreId)
            .FirstOrDefaultAsync();

        if (genre == null)
        {
            return new GenreDTO();
        }

        return genre.ToDTO();
    }

    public async Task<GenreDTO> GetGenreByName(string GenreName)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var genre = await context.Genres
            .Where(x => x.GenreName == GenreName)
            .FirstOrDefaultAsync();

        if (genre == null)
        {
            return new GenreDTO();
        }

        return genre.ToDTO(); 
    }
}
