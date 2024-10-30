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

        public async Task<List<Data.Game>> GetAllGames()
        {
            var context = await dbContextFactory.CreateDbContextAsync();

            return await context.Games.ToListAsync();
        }

        public async Task UploadGamesToDatabase(List<Data.Game> localGames)
        {
            var context = await dbContextFactory.CreateDbContextAsync();

            context.Games.AddRange(localGames);

            await context.SaveChangesAsync();
        }

        public async Task RemoveGames(List<Data.Game> localGames)
        {
            var context = await dbContextFactory.CreateDbContextAsync();
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

        public async Task UploadPlatformGamesToDatabase(List<PlatformGame> localPlatformGames)
        {
            var context = await dbContextFactory.CreateDbContextAsync();

            context.PlatformGames.AddRange(localPlatformGames);

            await context.SaveChangesAsync();
        }

        internal async Task UploadAcievementsToDatabase(List<Data.Achievement> achievementLists)
        {
            var context = await dbContextFactory.CreateDbContextAsync();

            context.Achievements.AddRange(achievementLists);

            await context.SaveChangesAsync();
        }

        public async Task UploadGenresToDatabase(List<Data.Genre> localGenres)
        {
            var context = await dbContextFactory.CreateDbContextAsync();

            context.Genres.AddRange(localGenres);

            await context.SaveChangesAsync();

        }

        public async Task UploadInvolvedCompaniesToDatabase(List<InvolvedCompany> localInvolvedCompanies)
        {
            var context = await dbContextFactory.CreateDbContextAsync();

            context.InvolvedCompanies.AddRange(localInvolvedCompanies);

            await context.SaveChangesAsync();
        }

        public async Task UploadGameGenres(List<GameGenre> localGameGenres)
        {
            var context = await dbContextFactory.CreateDbContextAsync();

            context.GameGenres.AddRange(localGameGenres);

            await context.SaveChangesAsync();
        }

        public async Task<List<Data.PlatformGame>> GetAllPlatformGames()
        {
            var context = await dbContextFactory.CreateDbContextAsync();

            return await context.PlatformGames.ToListAsync();
        }

        public async Task PleaseDeleteThem()
        {
			var context = await dbContextFactory.CreateDbContextAsync();
			var gamesToDelete = context.PlatformGames.Where(p => Strainer.FlaggedPlatforms.Contains(p.PlatformId)).ToList(); // Execute query

			// Process deletion in batches concurrently
			int batchSize = 1; // Size of each batch
			int maxConcurrentTasks = 50; // Maximum number of concurrent tasks
			var semaphore = new SemaphoreSlim(maxConcurrentTasks); // Create a semaphore

			List<Task> deleteTasks = new List<Task>();

			for (int i = 0; i < gamesToDelete.Count; i += batchSize)
			{
				var batch = gamesToDelete.Skip(i).Take(batchSize).ToList(); // Take a batch of items

				// Wait for the semaphore to allow a new task
				await semaphore.WaitAsync();

				deleteTasks.Add(Task.Run(async () =>
				{
					try
					{
						using var newContext = dbContextFactory.CreateDbContext(); // Ensure a new context is used
						newContext.PlatformGames.RemoveRange(batch);
						await newContext.SaveChangesAsync(); // Asynchronously save changes
					}
					finally
					{
						// Release the semaphore
						semaphore.Release();
					}
				}));
			}

			// Wait for all tasks to complete
			await Task.WhenAll(deleteTasks);

		}
	}
}
