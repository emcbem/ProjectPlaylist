using IGDB;

namespace PlaylistApp.Server.Services.IGDBServices.Game;
using System.Text.Json.Nodes;
using PlaylistApp.Server.Data;

public interface IIGDBGameService
{
    public Task<JsonArray> GetGamesFromIGDB(string query);
    public Task PostGamesToDatabase(JsonArray games);
    public Game ParseGameIntoLocalGame(JsonObject jsonObject);
}
