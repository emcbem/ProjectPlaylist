using PlaylistApp.Server.Data;

namespace PlaylistApp.Server.Services.IGDBSyncServices.Builders;

public class GameGenreBuilder
{
    private Dictionary<int, Data.Game> IgdbIdToLocalGames { get; set; } = new();
    private Dictionary<int, Data.Game> IgdbIdToActualGames { get; set; } = new();

    public async Task Setup(Dictionary<int, PlaylistApp.Server.Data.Game> localGames, Dictionary<int, PlaylistApp.Server.Data.Game> allGames)
    {
        await Task.CompletedTask;
        IgdbIdToLocalGames = localGames;
        IgdbIdToActualGames = allGames;
    }

    public GameGenre? MakeGameGenre(int igdbId, int genreId)
    {
        if (IgdbIdToActualGames.ContainsKey(igdbId))
        {
            return new GameGenre()
            {
                GameId = IgdbIdToActualGames[igdbId].Id,
                GenreId = genreId
            };
        }
        return null;
    }

    public List<GameGenre> MakeGameGenres(int igdbId)
    {
        List<GameGenre> gameGenres = new List<GameGenre>();
        if (IgdbIdToLocalGames.ContainsKey(igdbId))
        {
            foreach (int genre in IgdbIdToLocalGames[igdbId].GenreIds)
            {
                GameGenre? newGameGenre = MakeGameGenre(igdbId, genre);
                if (newGameGenre != null)
                {
                    gameGenres.Add(newGameGenre);
                }
            }
        }
        return gameGenres;
    }
}
