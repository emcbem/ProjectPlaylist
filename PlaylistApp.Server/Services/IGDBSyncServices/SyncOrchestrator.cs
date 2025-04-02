using PlaylistApp.Server.Interfaces;
using PlaylistApp.Server.Services.IGDBServices;
using PlaylistApp.Server.Services.IGDBSyncServices.AchievementGetter;
using PlaylistApp.Server.Services.IGDBSyncServices.DataGetters;

namespace PlaylistApp.Server.Services.IGDBSyncServices;

public class SyncOrchestrator
{
    private readonly DifferenceHandler differenceHandler;
    private readonly IDataGetter dataGetter;
    private readonly IAchievementUpdater achievementUpdater;

    public SyncOrchestrator(DifferenceHandler differenceHandler, IDataGetter dataGetter, IAchievementUpdater achievementUpdater)
    {
        this.differenceHandler = differenceHandler;
        this.dataGetter = dataGetter;
        this.achievementUpdater = achievementUpdater;
    }
    public async Task OrchestrateCompanies()
    {
        var igdbCompanies = await dataGetter.GetCompanys();
        var igdbCompanyLogos = await dataGetter.GetCompanyLogos();
        var localCompanies = Translator.TranslateIGDBCompaniesIntoPersonalData(igdbCompanies, igdbCompanyLogos);
        await differenceHandler.HandleCompanyDifferences(localCompanies);

        igdbCompanies = null;
        igdbCompanyLogos = null;
        localCompanies = null;
    }

    public async Task OrchestratePlatforms()
    {
        var igdbPlatforms = await dataGetter.GetPlatforms();
        var igdbPlatformLogos = await dataGetter.GetPlatformLogos();
        var localPlatforms = Translator.TranslateIGDBPlatformsIntoPersonalData(igdbPlatforms, igdbPlatformLogos);
        await differenceHandler.HandlePlatformDifferences(localPlatforms);

        igdbPlatforms = null;
        igdbPlatformLogos = null;
        localPlatforms = null;
    }

    public async Task OrchestrateGenres()
    {
        var igdbGenres = await dataGetter.GetGenres();
        var localGenres = Translator.TranslateIGDBGenresIntoPersonalData(igdbGenres);
        await differenceHandler.HandleGenreDifferences(localGenres);

        igdbGenres = null;
        localGenres = null;
    }

    public async Task OrchestrateGamesAndManyToManys()
    {
        var igdbGames = await dataGetter.GetGames();
        igdbGames = Strainer.StrainGames(igdbGames);

        var igdbCovers = await dataGetter.GetCovers();
        var igdbRatings = await dataGetter.GetRatings();    
        var localGames = Translator.TranslateIGDBGamesIntoPersonalData(igdbGames, igdbCovers, igdbRatings);
        var gameDifference =  await differenceHandler.HandleGameDifferences(localGames);
        
        igdbGames = null;
        igdbCovers = null;

        await OrchestratePlatformGamesAndAchievements(gameDifference, localGames);

        await OrchestrateGameGenres(gameDifference, localGames);

        await OrchestrateInvolvedCompanies(gameDifference, localGames);
    }

    private async Task OrchestrateInvolvedCompanies(DifferencesToCheck gameDifference, List<Data.Game> localGames)
    {
        await differenceHandler.HandleInvolvedCompanyDifferences(gameDifference, localGames);
    }

    private async Task OrchestrateGameGenres(DifferencesToCheck gameDifference, List<Data.Game> localGames)
    {
        await differenceHandler.HandleGameGenreDifferences(gameDifference, localGames);
    }

    public async Task OrchestratePlatformGamesAndAchievements(DifferencesToCheck gameDifferences, List<Data.Game> localGames)
    {
        var platformGamesAdded = await differenceHandler.HandlePlatformGameDifferences(gameDifferences, localGames);

        await achievementUpdater.UpdatePlatformGames(platformGamesAdded);
    }

    
}
