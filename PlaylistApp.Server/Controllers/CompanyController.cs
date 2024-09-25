using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Services.Achievement;
using PlaylistApp.Server.Services.CompanyServices;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class CompanyController : Controller
{
    private readonly ICompanyService companyService;

    public CompanyController(ICompanyService companyService)
    {
        this.companyService = companyService;
    }

    [HttpGet("getallcompanies")]
    public async Task<List<CompanyDTO>> GetAllCompanies()
    {
        return await companyService.GetAllCompanies();
    }

    [HttpGet("getallcompaniesbygame")]
    public async Task<List<CompanyDTO>> GetAllCompaniesByGame(int gameId)
    {
        return await companyService.GetAllCompaniesByGame(gameId);
    }

    [HttpGet("getallcompaniesbyname")]
    public async Task<List<CompanyDTO>> GetAllCompaniesByName(string companyName)
    {
        return await companyService.GetAllCompaniesByName(companyName);
    }
}
