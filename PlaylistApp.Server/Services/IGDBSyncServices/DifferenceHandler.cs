using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using MimeKit.Encodings;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.Interfaces;
using PlaylistApp.Server.Services.IGDBServices;
using PlaylistApp.Server.Services.IGDBSyncServices.Builders;
using PlaylistApp.Server.Services.IGDBSyncServices.DatabaseProcessors;

namespace PlaylistApp.Server.Services.IGDBSyncServices
{
    public class DifferenceHandler
    {
        public IDbContextFactory<PlaylistDbContext> dbContextFactory { get; set; }
        public PlatformGameBuilder platformGameBuilder { get; set; }
        public IDatabaseProcessor databaseProcessor { get; set; }
        public DifferenceHandler(IDbContextFactory<PlaylistDbContext> dbContextFactory, PlatformGameBuilder platformGameBuilder, IDatabaseProcessor databaseProcessor)
        {
            this.dbContextFactory = dbContextFactory;
            this.platformGameBuilder = platformGameBuilder;
            this.databaseProcessor = databaseProcessor;
        }

        public async Task HandleCompanyDifferences(List<Company> localCompanies)
        {
            var context = await dbContextFactory.CreateDbContextAsync();

            var igdbIdToChecksum = localCompanies?.ToDictionary(x => x.IgdbId ?? 0, x => x.Checksum ?? "") ?? new Dictionary<int, string>();
            var igdbIdToLocal = localCompanies?.ToDictionary(x => x.IgdbId ?? 0, x => x) ?? new Dictionary<int, Company>();

            var AllTheCompanies = await context.Companies.ToListAsync();
            var ICheckSumCompanies = AllTheCompanies.Select(x => (IChecksum)x).ToList();

            var differences = DifferenceFinder.FindItemsThatNeedAttention(ICheckSumCompanies, igdbIdToChecksum);

            var itemsToRemove = AllTheCompanies.Where(x => differences.PersonalItemsThatAreNoLongerInIgdb?.Contains(x) ?? false).ToList();

            context.RemoveRange(itemsToRemove);
            context.AddRange(localCompanies?.Where(x => differences.IgdbIdsNeededToBeAdded?.Contains(x?.IgdbId ?? throw new Exception()) ?? throw new Exception()) ?? []);

            foreach (var checksumChange in differences.ChecksumsThatChanged ?? [])
            {
                var correctRow = igdbIdToLocal[checksumChange?.IgdbId ?? throw new Exception()];
                var changedCompany = AllTheCompanies.Where(x => x.IgdbId == checksumChange.IgdbId).FirstOrDefault();

                if (changedCompany != null)
                {
                    changedCompany.Checksum = correctRow.Checksum;
                    changedCompany.Slug = correctRow.Slug;
                    changedCompany.LogoUrl = correctRow.LogoUrl;
                    changedCompany.CompanyName = correctRow.CompanyName;
                    changedCompany.Description = correctRow.Description;
                    changedCompany.StartDate = correctRow.StartDate;

                    context.Update(changedCompany);
                }
            }

            await context.SaveChangesAsync();
        }

        public async Task<DifferencesToCheck> HandlePlatformDifferences(List<Platform> localPlatforms)
        {
            var context = await dbContextFactory.CreateDbContextAsync();

            var igdbIdToChecksum = localPlatforms?.ToDictionary(x => x.IgdbId ?? 0, x => x.Checksum ?? "") ?? new Dictionary<int, string>();
            var igdbIdToLocal = localPlatforms?.ToDictionary(x => x.IgdbId ?? 0, x => x) ?? new Dictionary<int, Platform>();

            var AllThePlatforms = await context.Platforms.ToListAsync();
            var ICheckSumPlatforms = AllThePlatforms.Select(x => (IChecksum)x).ToList();

            var differences = DifferenceFinder.FindItemsThatNeedAttention(ICheckSumPlatforms, igdbIdToChecksum);

            var itemsToRemove = AllThePlatforms.Where(x => differences.PersonalItemsThatAreNoLongerInIgdb?.Contains(x) ?? false).ToList();

            context.RemoveRange(itemsToRemove);
            context.AddRange(localPlatforms?.Where(x =>
                (differences.IgdbIdsNeededToBeAdded?.Contains(x?.IgdbId ?? throw new Exception()) ?? throw new Exception()) &&
                !Strainer.FlaggedPlatforms.Contains(x?.IgdbId ?? throw new Exception())) ?? []);

            foreach (var checksumChange in differences.ChecksumsThatChanged ?? [])
            {
                var correctRow = igdbIdToLocal[checksumChange?.IgdbId ?? throw new Exception()];
                var changedPlatform = AllThePlatforms.Where(x => x.IgdbId == checksumChange.IgdbId).FirstOrDefault();

                if (changedPlatform != null)
                {
                    changedPlatform.Checksum = correctRow.Checksum;
                    changedPlatform.PlatformName = correctRow.PlatformName;
                    changedPlatform.LogoUrl = correctRow.LogoUrl;

                    context.Update(changedPlatform);
                }
            }

            await context.SaveChangesAsync();
            return differences;
        }

        public async Task<DifferencesToCheck> HandleGenreDifferences(List<Genre> localGenres)
        {
            var context = await dbContextFactory.CreateDbContextAsync();

            var igdbIdToChecksum = localGenres?.ToDictionary(x => x.IgdbId ?? 0, x => x.Checksum ?? "") ?? new Dictionary<int, string>();
            var igdbIdToLocal = localGenres?.ToDictionary(x => x.IgdbId ?? 0, x => x) ?? new Dictionary<int, Genre>();

            var AllTheGenres = await context.Genres.ToListAsync();
            var ICheckSumGenres = AllTheGenres.Select(x => (IChecksum)x).ToList();

            var differences = DifferenceFinder.FindItemsThatNeedAttention(ICheckSumGenres, igdbIdToChecksum);

            var itemsToRemove = AllTheGenres.Where(x => differences.PersonalItemsThatAreNoLongerInIgdb?.Contains(x) ?? false).ToList();

            context.RemoveRange(itemsToRemove);
            context.AddRange(localGenres?.Where(x => differences.IgdbIdsNeededToBeAdded?.Contains(x?.IgdbId ?? throw new Exception()) ?? throw new Exception()) ?? []);

            foreach (var checksumChange in differences.ChecksumsThatChanged ?? [])
            {
                var correctRow = igdbIdToLocal[checksumChange?.IgdbId ?? throw new Exception()];
                var changedGenre = AllTheGenres.Where(x => x.IgdbId == checksumChange.IgdbId).FirstOrDefault();

                if (changedGenre != null)
                {
                    changedGenre.Checksum = correctRow.Checksum;
                    changedGenre.GenreName = correctRow.GenreName;

                    context.Update(changedGenre);
                }
            }

            await context.SaveChangesAsync();
            return differences;
        }

        internal async Task<DifferencesToCheck> HandleGameDifferences(List<Data.Game> localGames)
        {
            using var context = await dbContextFactory.CreateDbContextAsync();

            var igdbIdToChecksum = localGames?.ToDictionary(x => x.IgdbId ?? 0, x => x.Checksum ?? "") ?? new();
            var igdbIdToLocal = localGames?.ToDictionary(x => x.IgdbId ?? 0, x => x) ?? new();

            var allGames = await context.Games.ToListAsync(); // Load all games once
            var iCheckSumGames = allGames.Cast<IChecksum>().ToList(); // Cast directly

            var differences = DifferenceFinder.FindItemsThatNeedAttention(iCheckSumGames, igdbIdToChecksum);

            var gamesToRemoveSet = differences.PersonalItemsThatAreNoLongerInIgdb ?? new HashSet<IChecksum>();

            var itemsToRemove = allGames.Where(g => gamesToRemoveSet.Contains(g)).ToList();

            await databaseProcessor.DeleteRangeAsync(itemsToRemove);
            await databaseProcessor.AddRangeAsync(localGames?.Where(x => differences.IgdbIdsNeededToBeAdded?.Contains(x?.IgdbId ?? throw new Exception()) ?? throw new Exception()) ?? []);

            var igdbIdToTrackedGames = allGames.ToDictionary(x => x.IgdbId ?? 0, x => x);
            List<PlaylistApp.Server.Data.Game> updatedGames = new();
            foreach (var checksumChange in differences.ChecksumsThatChanged ?? [])
            {
                var correctRow = igdbIdToLocal[checksumChange?.IgdbId ?? throw new Exception()];
                var changedGame = igdbIdToTrackedGames[checksumChange.IgdbId ?? 0];

                if (changedGame != null)
                {
                    changedGame.Checksum = correctRow.Checksum;
                    changedGame.PublishDate = correctRow.PublishDate;
                    changedGame.AgeRating = correctRow.AgeRating;
                    changedGame.Description = correctRow.Description;
                    changedGame.CoverUrl = correctRow.CoverUrl;
                    changedGame.PublishDate = correctRow.PublishDate;
                    changedGame.Title = correctRow.Title;

                    updatedGames.Add(changedGame);
                }
            }

            await databaseProcessor.UpdateRangeAsync(updatedGames);
            return differences;
        }


        internal async Task HandlePlatformGameDifferences(DifferencesToCheck gameDifferences, List<Data.Game> localGames)
        {
            var context = await dbContextFactory.CreateDbContextAsync();
            var allGames = await context.Games
                .Include(x => x.PlatformGames)
                .Where(x => x.IgdbId != null) 
                .ToListAsync();

            var IgdbIdToLocalGame = localGames.ToDictionary(x => x.IgdbId ?? 0, x => x);
            var IgdbIdToActualGame = allGames.ToDictionary(x => x.IgdbId!.Value, x => x);

            await platformGameBuilder.Setup(IgdbIdToLocalGame, IgdbIdToActualGame);

            //Handle possible platform game differences
            foreach (var idDif in gameDifferences.ChecksumsThatChanged ?? [])
            {
                if(!IgdbIdToActualGame.ContainsKey(idDif.IgdbId ?? 0))
                {
                    continue;
                }

                var localGameInQuestion = IgdbIdToLocalGame[idDif.IgdbId ?? 0].PlatformIds;
                var actualGameInQuestion = IgdbIdToActualGame[idDif.IgdbId ?? 0];

                var actualGamesPlatformGameIDs = actualGameInQuestion.PlatformGames.Select(x => x.PlatformId).Where(x => !Strainer.FlaggedPlatforms.Contains(x));
                var onlyInLocal = localGameInQuestion.Except(actualGamesPlatformGameIDs).ToList();
                var onlyInActual = actualGamesPlatformGameIDs.Except(localGameInQuestion).ToList();

                if (onlyInActual is not null)
                {
                    foreach (var platform in onlyInActual)
                    {
                        context.PlatformGames.Remove(actualGameInQuestion.PlatformGames.First(x => x.PlatformId == platform));
                    }
                }
                if (onlyInLocal is not null)
                {
                    foreach (var platformId in onlyInLocal)
                    {
                        var possiblePlatform = platformGameBuilder.MakePlatformGame(idDif.IgdbId ?? 0, platformId); 
                        if (possiblePlatform is not null)
                        {
                            context.PlatformGames.Add(possiblePlatform);
                        }
                    }
                }
            }

            foreach (var id in gameDifferences.IgdbIdsNeededToBeAdded ?? [])
            {
                var platformGames = platformGameBuilder.MakePlatfromGames(id);
                if(platformGames is not null)
                {
                    context.PlatformGames.AddRange(platformGames);
                }
            }

            await context.SaveChangesAsync();

            //Add all the new platform games.
        }
    }
}
