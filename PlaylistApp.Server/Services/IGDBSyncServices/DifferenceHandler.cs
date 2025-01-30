using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
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
            var csvLocalCompanyDict = localCompanies?.ToDictionary(x => x.IgdbId ?? 0, x => x.Checksum ?? "") ?? new Dictionary<int, string>();
            var igdbIdToLocal = localCompanies?.ToDictionary(x => x.IgdbId ?? 0, x => x) ?? new Dictionary<int, Company>();


            var context = await dbContextFactory.CreateDbContextAsync();
            var AllTheCompanies = await context.Companies.ToListAsync();
            var ICheckSumCompanies = AllTheCompanies.Select(x => (IChecksum)x).ToList();

            var differenceFinder = new DifferenceFinder();
            var differences = DifferenceFinder.FindItemsThatNeedAttention(ICheckSumCompanies, csvLocalCompanyDict);

            var itemsToRemove = AllTheCompanies.Where(x => differences.PersonalItemsThatAreNoLongerInIgdb?.Contains(x) ?? false).ToList();

            context.RemoveRange(itemsToRemove);
            context.AddRange(localCompanies.Where(x => differences.IgdbIdsNeededToBeAdded?.Contains(x?.IgdbId ?? throw new Exception()) ?? throw new Exception()));

            foreach (var checksumChange in differences.ChecksumsThatChanged)
            {
                var correctRow = igdbIdToLocal[checksumChange?.IgdbId ?? throw new Exception()];
                var changedCompany = AllTheCompanies.Where(x => x.IgdbId == checksumChange.IgdbId).FirstOrDefault();
                changedCompany.Checksum = correctRow.Checksum;
                changedCompany.Slug = correctRow.Slug;
                changedCompany.LogoUrl = correctRow.LogoUrl;
                changedCompany.CompanyName = correctRow.CompanyName;
                changedCompany.Description = correctRow.Description;
                changedCompany.StartDate = correctRow.StartDate;

                context.Update(changedCompany);
            }

            await context.SaveChangesAsync();
        }
    }
}
