using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using MimeKit.Encodings;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.Interfaces;
using PlaylistApp.Server.Services.IGDBServices;

namespace PlaylistApp.Server.Services.IGDBSyncServices
{
    public class DifferenceHandler
    {
        public IDbContextFactory<PlaylistDbContext> dbContextFactory { get; set; }
        public DifferenceHandler(IDbContextFactory<PlaylistDbContext> dbContextFactory)
        {
            this.dbContextFactory = dbContextFactory;
        }

        public async Task HandleCompanyDifferences(List<Company> localCompanies)
        {
            var context = await dbContextFactory.CreateDbContextAsync();

            var igdbIdToChecksum = localCompanies?.ToDictionary(x => x.IgdbId ?? 0, x => x.Checksum ?? "") ?? new Dictionary<int, string>();
            var igdbIdToLocal = localCompanies?.ToDictionary(x => x.IgdbId ?? 0, x => x) ?? new Dictionary<int, Company>();

            var AllTheCompanies = await context.Companies.ToListAsync();
            var ICheckSumCompanies = AllTheCompanies.Select(x => (IChecksum)x).ToList();

            var differenceFinder = new DifferenceFinder();
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

            var differenceFinder = new DifferenceFinder();
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

            var differenceFinder = new DifferenceFinder();
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
    }
}
