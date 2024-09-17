using IGDB;

namespace PlaylistApp.Server.Services.IGDBServices;
using System.Text.Json.Nodes;
using PlaylistApp.Server.Data;

public interface IIGDBService
{
    public Task<JsonArray> GetGamesFromIGDB(string query);
    public Task PostGamesToDatabase(JsonArray games);
    public Game ParseGameIntoLocalGame(JsonObject jsonObject);
}
