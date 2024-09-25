using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;

namespace PlaylistApp.Server.Services.CompanyServices;

public class CompanyService : ICompanyService
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;

    public CompanyService(IDbContextFactory<PlaylistDbContext> dbContextFactory)
    {
        this.dbContextFactory = dbContextFactory;
    }
    public async Task<List<CompanyDTO>> GetAllCompanies()
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var companies = await context.Companies.ToListAsync();

        if (!companies.Any())
        {
            return new List<CompanyDTO>();
        }

        return companies.Select(x => x.ToDTO()).ToList();
    }

    public async Task<List<CompanyDTO>> GetAllCompaniesByGame(int gameId)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var companies = await context.Companies
            .Include(x => x.InvolvedCompanies)
            .Where(x => context.InvolvedCompanies.Where(y => y.GameId == gameId).Count() > 0)
            .ToListAsync();

        if (!companies.Any())
        {
            return new List<CompanyDTO>();  
        }

        return companies.Select(x => x.ToDTO()).ToList();
    }

    public async Task<List<CompanyDTO>> GetAllCompaniesByName(string companyName)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var companies = await context.Companies
            .Where(x => x.CompanyName == companyName)
            .ToListAsync();

        if (!companies.Any())
        {
            return new List<CompanyDTO>();
        }

        return companies.Select(x => x.ToDTO()).ToList();
    }
}
