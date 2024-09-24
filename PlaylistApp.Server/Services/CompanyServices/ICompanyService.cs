using PlaylistApp.Server.DTOs;

namespace PlaylistApp.Server.Services.CompanyServices;

public interface ICompanyService
{
    public Task<List<CompanyDTO>> GetAllCompanies();
    public Task<List<CompanyDTO>> GetAllCompaniesByGame(int gameId);
    public Task<List<CompanyDTO>> GetAllCompaniesByName(string companyName);
}
