using PlaylistApp.Server.Interfaces;
using PlaylistApp.Server.Services.IGDBServices;
using PlaylistApp.Server.Services.IGDBSyncServices.DataGetters;

namespace PlaylistApp.Server.Services.IGDBSyncServices;

public class SyncOrchestrator
{
    private readonly DifferenceHandler differenceHandler;
    private readonly IDataGetter dataGetter;

    public SyncOrchestrator(DifferenceHandler differenceHandler, IDataGetter dataGetter)
    {
        this.differenceHandler = differenceHandler;
        this.dataGetter = dataGetter;
    }
    public async Task OrchestrateCompanies()
    {
        var igdbCompanies = await dataGetter.GetCompanys();
        var igdbCompanyLogos = await dataGetter.GetCompanyLogos();
        var localCompanies = Translator.TranslateIGDBCompaniesIntoPersonalData(igdbCompanies, igdbCompanyLogos);
        await differenceHandler.HandleCompanyDifferences(localCompanies);
    }

    public async Task<DifferencesToCheck> OrchestratePlatforms()
    {
        var igdbPlatforms = await dataGetter.GetPlatforms();
        var igdbPlatformLogos = await dataGetter.GetPlatformLogos();
        var localPlatforms = Translator.TranslateIGDBPlatformsIntoPersonalData(igdbPlatforms, igdbPlatformLogos);
        return await differenceHandler.HandlePlatformDifferences(localPlatforms);
    }

    public async Task<DifferencesToCheck> OrchestrateGenres()
    {
        var igdbGenres = await dataGetter.GetGenres();
        var localGenres = Translator.TranslateIGDBGenresIntoPersonalData(igdbGenres);
        return await differenceHandler.HandleGenreDifferences(localGenres);
    }

    public async Task<DifferencesToCheck> OrchestrateGamesAndManyToManys()
    {
        var igdbGames = await dataGetter.GetGames();
        igdbGames = Strainer.StrainGames(igdbGames);

        var igdbCovers = await dataGetter.GetCovers();
        var igdbRatings = await dataGetter.GetRatings();    
        var localGames = Translator.TranslateIGDBGamesIntoPersonalData(igdbGames, igdbCovers, igdbRatings);
        var gameDifference =  await differenceHandler.HandleGameDifferences(localGames);
        gameDifference.ChecksumsThatChanged = igdbGames.Cast<IChecksum>().ToHashSet();
        
        //await OrchestratePlatformGames(gameDifference, localGames);
        //await OrchestrateGameGenres(gameDifference, localGames);
        await OrchestrateInvolvedCompanies(gameDifference, localGames);

        return gameDifference;
    }

    private async Task OrchestrateInvolvedCompanies(DifferencesToCheck gameDifference, List<Data.Game> localGames)
    {
        await differenceHandler.HandleInvolvedCompanyDifferences(gameDifference, localGames);
    }

    private async Task OrchestrateGameGenres(DifferencesToCheck gameDifference, List<Data.Game> localGames)
    {
        await differenceHandler.HandleGameGenreDifferences(gameDifference, localGames);
    }

    public async Task OrchestratePlatformGames(DifferencesToCheck gameDifferences, List<Data.Game> localGames)
    {
        await differenceHandler.HandlePlatformGameDifferences(gameDifferences, localGames);
    }
}
