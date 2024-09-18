using IGDB;
using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using System.Runtime.InteropServices.JavaScript;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace PlaylistApp.Server.Services.IGDBServices.Genre;

public class IGDBGenreService : IIGDBGenreService
{
    private readonly IDbContextFactory<PlaylistDbContext> contextFactory;
    private readonly IGDBClient igdbClient;

    public IGDBGenreService(IDbContextFactory<PlaylistDbContext> contextFactory, IGDBClient igdbClient)
    {
        this.contextFactory = contextFactory;
        this.igdbClient = igdbClient;
    }

    public async Task<JsonArray> GetGenresFromIGDB(string query)
    {
        var values = await igdbClient.QueryWithResponseAsync<IGDB.Models.Genre>(IGDBClient.Endpoints.Genres, query);

        //transform the data into values we can actually use
        var array = JsonNode.Parse(values.StringContent ?? "");

        return array!.AsArray();
    }

    public Data.Genre ParseGenreIntoLocalGenre(JsonObject genreObject)
    {
        var genre = new Data.Genre();

        var genreString = genreObject.ToString();

        using (var document = JsonDocument.Parse(genreString))
        {
            var root = document.RootElement;
            JsonElement foundProperty;

            if (root.TryGetProperty("id", out foundProperty))
            {
                genre.Id = foundProperty.GetInt32();
            }
            else
            {
                throw new Exception("No IGDB Id found, needed for creation");
            }

            if (root.TryGetProperty("name", out foundProperty))
            {
                genre.GenreName = foundProperty.GetString() ?? throw new Exception("No name found, needed for creation");
            }
        }

        return genre;
    }

    public async Task PostGenresToDatabase(JsonArray genres)
    {
        using var context = contextFactory.CreateDbContext();

        foreach (var genre in genres)
        {
            context.Genres.Add(ParseGenreIntoLocalGenre(genre!.AsObject()));
        }
        await context.SaveChangesAsync();
    }
}
