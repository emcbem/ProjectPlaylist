
using IGDB.Models;
using PlaylistApp.Server.Services.IGDBSyncServices.DataGetters;

namespace PlaylistApp.Server.Services.IGDBSyncServices.Builders;

public class InvolvedCompanyBuilder
{
    private readonly IDataGetter dataGetter;

    private Dictionary<int, IGDB.Models.InvolvedCompany> idToInvolvedCompany = new();
    private Dictionary<int, Data.Game> igdbIdToLocalGame = new();
    private Dictionary<int, Data.Game> igdbIdToActualGame = new();

    public InvolvedCompanyBuilder(IDataGetter dataGetter)
    {
        this.dataGetter = dataGetter;
    }
    internal async Task Setup(Dictionary<int, Data.Game> igdbIdToLocalGame, Dictionary<int, Data.Game> igdbIdToActualGame)
    {
        var involvedCompanies = await dataGetter.GetInvolvedCompanys();
        idToInvolvedCompany = involvedCompanies.ToDictionary(x => (int?)x.Id ?? 0, x => x);
        this.igdbIdToLocalGame = igdbIdToLocalGame;
        this.igdbIdToActualGame = igdbIdToActualGame;
    }

    public Data.InvolvedCompany? MakeInvolvedCompany(int igdbId, int involvedCompanyId)
    {
        if (idToInvolvedCompany.ContainsKey(involvedCompanyId) && igdbIdToActualGame.ContainsKey(igdbId))
        {
            var actualGame = igdbIdToActualGame[igdbId];
            var involvedCompany = idToInvolvedCompany[involvedCompanyId];

            return new Data.InvolvedCompany()
            { 
                CompanyId = (int?)involvedCompany.Company.Id ?? 0,
                IsDeveloper = involvedCompany.Developer,
                IsPublisher = involvedCompany.Publisher,
                GameId = actualGame.Id,
                Id = (int?)involvedCompany.Id ?? 0,
            };

        }
        return null;
    }

    public List<Data.InvolvedCompany> MakeInvolvedCompanies(int igdbId)
    {
        var involvedCompanies = new List<Data.InvolvedCompany>();
        if(igdbIdToLocalGame.ContainsKey(igdbId))
        {
            foreach(int involvedCompanyId in  igdbIdToLocalGame[igdbId].InvolvedCompanyIds)
            {
                var possibleCompany = MakeInvolvedCompany(igdbId, involvedCompanyId);
                if(possibleCompany != null)
                {
                    involvedCompanies.Add(possibleCompany);
                }
            }
        }
        return involvedCompanies;
    }
}
