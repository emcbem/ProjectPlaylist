using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;

namespace PlaylistApp.Server.Services.IGDBServices
{
    public class UploadData
    {
        IDbContextFactory<PlaylistDbContext> dbContextFactory;

        public UploadData(IDbContextFactory<PlaylistDbContext> dbContextFactory)
        {
            this.dbContextFactory = dbContextFactory;
        }

        public async Task UploadGamesToDatabase(List<Data.Game> localGames)
        {
            var context = await dbContextFactory.CreateDbContextAsync();

            context.Games.AddRange(localGames);

            await context.SaveChangesAsync();
        }

        public async Task UploadCompaniesToDatabase(List<Data.Company> localCompanies)
        {
            var context = await dbContextFactory.CreateDbContextAsync();

            context.Companies.AddRange(localCompanies);

            await context.SaveChangesAsync();
        }

        public async Task UploadPlatformsToDatabase(List<Platform> localPlatforms)
        {
            var context = await dbContextFactory.CreateDbContextAsync();

            context.Platforms.AddRange(localPlatforms);

            await context.SaveChangesAsync();
        }

    }
}
