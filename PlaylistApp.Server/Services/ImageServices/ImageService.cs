using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;

namespace PlaylistApp.Server.Services.ImageServices;

public class ImageService : IImageService
{

    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;

    public ImageService(IDbContextFactory<PlaylistDbContext> dbContextFactory)
    {
        this.dbContextFactory = dbContextFactory;
    }

    public async Task<List<UserImage>> GetImagesAsync()
    {
        using var context = dbContextFactory.CreateDbContext();

        var userImgs = await context.UserImages.ToListAsync();

        return userImgs;
    }
}
