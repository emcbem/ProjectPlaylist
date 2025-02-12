
using IGDB.Models;
using PlaylistApp.Server.Services.IGDBSyncServices.DataGetters;

namespace PlaylistApp.Server.Services.IGDBSyncServices.Builders;

public class InvolvedCompanyBuilder
{
    private readonly IDataGetter dataGetter;

    private Dictionary<int, IGDB.Models.InvolvedCompany> IdToInvolvedCompany = new();
    private Dictionary<int, Data.Game> igdbIdToLocalGame = new();
    private Dictionary<int, Data.Game> igdbIdToActualGame = new();

    public InvolvedCompanyBuilder(IDataGetter dataGetter)
    {
        this.dataGetter = dataGetter;
    }
    internal async Task Setup(Dictionary<int, Data.Game> igdbIdToLocalGame, Dictionary<int, Data.Game> igdbIdToActualGame)
    {
        var involvedCompanies = await dataGetter.GetInvolvedCompanys();
        IdToInvolvedCompany = involvedCompanies.ToDictionary(x => (int?)x.Id ?? 0, x => x);
        this.igdbIdToLocalGame = igdbIdToLocalGame;
        this.igdbIdToActualGame = igdbIdToActualGame;
    }

    public Data.InvolvedCompany MakeInvolvedCompany(int igdbId, int involvedCompanyId)
    {
        return new();
    }

    public List<Data.InvolvedCompany> MakeInvolvedCompanies(int igdbId)
    {
        return new();
    }
}
