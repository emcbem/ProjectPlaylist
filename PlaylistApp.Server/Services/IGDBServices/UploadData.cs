﻿using Microsoft.EntityFrameworkCore;
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
    }
}
