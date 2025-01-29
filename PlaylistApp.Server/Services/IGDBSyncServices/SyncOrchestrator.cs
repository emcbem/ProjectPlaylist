using IGDB;
using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.Interfaces;
using PlaylistApp.Server.Services.Game;
using PlaylistApp.Server.Services.IGDBServices;

namespace PlaylistApp.Server.Services.IGDBSyncServices;

public class SyncOrchestrator
{
    private readonly DownloadCsv downloader;
    private readonly UploadData uploader;
    private readonly IGameService gameService;
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;

    public SyncOrchestrator(DownloadCsv downloader, UploadData uploader, IGameService gameService, IDbContextFactory<PlaylistDbContext> dbContextFactory)
    {
        this.downloader = downloader;
        this.uploader = uploader;
        this.gameService = gameService;
        this.dbContextFactory = dbContextFactory;
    }
    public async Task<DifferencesToCheck> OrchestrateCompanies()
    {
        var companiesLocalPath = await downloader.DownloadCSV(IGDBClient.Endpoints.Companies);
        var igdbCompanies = Parser.ParseCompanyCsv(companiesLocalPath);
        var companyLogoUrl = await downloader.DownloadCSV(IGDBClient.Endpoints.CompanyLogos);
        var igdbCompanyLogos = Parser.ParseCompanyLogoCsv(companyLogoUrl);
        var localCompanies = Translator.TranslateIGDBCompaniesIntoPersonalData(igdbCompanies, igdbCompanyLogos);
        var csvLocalCompanyDict = localCompanies?.ToDictionary(x => x.IgdbId ?? 0, x => x.Checksum ?? "") ?? new Dictionary<int, string>();

        var context = await dbContextFactory.CreateDbContextAsync();
        var AllTheCompanies = await context.Companies.Select(x => (IChecksum)x).ToListAsync();

        var differenceFinder = new DifferenceFinder();
        var differences = DifferenceFinder.FindItemsThatNeedAttention(AllTheCompanies, csvLocalCompanyDict);

        context.RemoveRange(AllTheCompanies.Where(x => differences.PersonalItemsThatAreNoLongerInIgdb?.Contains(x as IChecksum) ?? false));
        context.AddRange(localCompanies.Where(x => differences.IgdbIdsNeededToBeAdded?.Contains(x?.IgdbId ?? 0) ?? false));

        await context.SaveChangesAsync();
        return differences;
        //await uploader.UploadCompaniesToDatabase(localCompanies);
    }
}
