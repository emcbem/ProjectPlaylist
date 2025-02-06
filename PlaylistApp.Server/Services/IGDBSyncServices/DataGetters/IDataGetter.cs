using IGDB.Models;

namespace PlaylistApp.Server.Services.IGDBSyncServices.DataGetters;

public interface IDataGetter
{
    public Task<List<CompanyLogo>> GetCompanyLogos();   
    public Task<List<Company>> GetCompanys();
    public Task<List<Cover>> GetCovers();
    public Task<List<ExternalGame>> GetExternalGames();
    public Task<List<IGDB.Models.Game>> GetGames();
    public Task<List<Genre>> GetGenres();
    public Task<List<InvolvedCompany>> GetInvolvedCompanys();
    public Task<List<PlatformLogo>> GetPlatformLogos();
    public Task<List<Platform>> GetPlatforms();
    public Task<List<AgeRating>> GetRatings();
    public Task<List<Website>> GetWebsites();
}
