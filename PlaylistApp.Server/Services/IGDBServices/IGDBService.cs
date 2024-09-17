using IGDB;
using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.Data.Enums;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace PlaylistApp.Server.Services.IGDBServices;

public class IGDBService : IIGDBService
{
    private IDbContextFactory<PlaylistDbContext> contextFactory;
    private IGDBClient igdbClient;
    public IGDBService()
    {
        
    }

    public IGDBService(IDbContextFactory<PlaylistDbContext> contextFactory, IGDBClient igdbClient)
    {
        this.contextFactory = contextFactory;
        this.igdbClient = igdbClient;
    }

    public async Task<JsonArray> GetGamesFromIGDB(string query)
    {
        var values = await igdbClient.QueryWithResponseAsync<IGDB.Models.Game>(IGDBClient.Endpoints.Games, query);
        var array = JsonArray.Parse(values.StringContent ?? "");
        return array!.AsArray();
    }

    public async Task PostGamesToDatabase(JsonArray games)
    {
        using var context = contextFactory.CreateDbContext();
        foreach (var game in games)
        {
            context.Games.Add(ParseGameIntoLocalGame(game!.AsObject()));
        }
        await context.SaveChangesAsync();
    }

    public Data.Game ParseGameIntoLocalGame(JsonObject jsonObject)
    {
        var game = new Data.Game();

        var jsonString = jsonObject.ToString();

        using (var document = JsonDocument.Parse(jsonString))
        {
            var root = document.RootElement;
            game.Title = root.GetProperty("name").GetString() ?? "";
            game.AgeRating = ((AgeRatingCategory)root.GetProperty("age_ratings")
                .EnumerateArray()
                .Where(x => x.GetProperty("category").GetInt32() == 1)
                .FirstOrDefault()
                .GetProperty("rating")
                .GetInt32()).ToString();
            game.CoverUrl = root.GetProperty("cover").GetProperty("url").ToString().Replace("t_thumb", "t_cover_big");
            game.Description = root.GetProperty("summary").GetString() ?? string.Empty;
            game.PublishDate = UnixTimeToDateTime(root.GetProperty("release_dates").EnumerateArray().Min(x => x.GetProperty("date").GetUInt32()));
            game.IdgbId = root.GetProperty("id").GetInt32();
        }
        return game;
    }

    public static DateTime UnixTimeToDateTime(long unixTimeSeconds)
    {
        // Unix epoch
        DateTime unixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        // Convert Unix time to DateTime
        return unixEpoch.AddSeconds(unixTimeSeconds).ToUniversalTime();
    }
}
