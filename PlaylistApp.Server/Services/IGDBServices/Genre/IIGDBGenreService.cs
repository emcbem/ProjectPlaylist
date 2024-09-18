using System.Text.Json.Nodes;

namespace PlaylistApp.Server.Services.IGDBServices.Genre;

public interface IIGDBGenreService
{
    public Data.Genre ParseGenreIntoLocalGenre(JsonObject genreObject);
    public  Task<JsonArray> GetGenresFromIGDB(string query);
    public Task PostGenresToDatabase(JsonArray genres);
}
