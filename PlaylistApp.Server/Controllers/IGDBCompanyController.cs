using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.Services.IGDBServices;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class IGDBCompanyController : Controller
{
    private readonly IGDBCompanyService igdbService;

    public IGDBCompanyController(IGDBCompanyService igdbService)
    {
        this.igdbService = igdbService;
    }

    [HttpGet("AddDecentCompanies")]
    public async Task PostGames()
    {
        //var jsonCompanies = await igdbService.GetCompaniesFromIGDB("fields *, logo.*; where developed != null; where published != null; where logo != null; limit 500; where start_date_category = 1;");

        //await igdbService.PostGamesToDatabase(jsonCompanies);
    }
}
