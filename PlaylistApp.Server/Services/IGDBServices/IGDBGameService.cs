using IGDB;
using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.Data.Enums;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace PlaylistApp.Server.Services.IGDBServices;

public class IGDBGameService
{
    private IDbContextFactory<PlaylistDbContext> contextFactory;
    private IGDBClient igdbClient;

    public IGDBGameService(IDbContextFactory<PlaylistDbContext> contextFactory, IGDBClient igdbClient)
    {
        this.contextFactory = contextFactory;
        this.igdbClient = igdbClient;
    }

    public async Task<JsonArray> GetGamesFromIGDB(string query)
    {
        var values = await igdbClient.QueryWithResponseAsync<IGDB.Models.Game>(IGDBClient.Endpoints.Games, query);

        //transform the data into values we can actually use
        var array = JsonNode.Parse(values.StringContent ?? "");

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

    public Data.Game ParseGameIntoLocalGame(JsonObject jsonGame)
    {
        var game = new Data.Game();

        var jsonString = jsonGame.ToString();

        using (var document = JsonDocument.Parse(jsonString))
        {
            var root = document.RootElement;
            JsonElement foundProperty;

            //try get id
            if (root.TryGetProperty("id", out foundProperty))
            {
                game.IdgbId = foundProperty.GetInt32();
            }
            else
            {
                throw new Exception("No IGDB Id found, needed for creation");
            }

            //Try Get title
            if (root.TryGetProperty("name", out foundProperty))
            {
                game.Title = foundProperty.GetString() ?? throw new Exception("No name found, needed for creation");
            }

            //Try Get esrb category
            if (root.TryGetProperty("age_ratings", out foundProperty))
            {
                JsonElement foundCategory;
                foreach (var item in foundProperty.EnumerateArray())
                {
                    if (item.TryGetProperty("category", out foundCategory))
                    {
                        //1 is the category of ESRB
                        if (foundCategory.GetUInt32() != 1)
                        {
                            continue;
                        }
                        var ratingNum = item.GetProperty("rating").GetUInt32();
                        game.AgeRating = ((AgeRatingCategory)ratingNum).ToString();
                    }
                }

                //If no age rating was found replace with default value
            }
            if (game.AgeRating is null)
            {
                game.AgeRating = "NaN";
            }


            //Try Get Cover Url
            if (root.TryGetProperty("cover", out foundProperty))
            {
                JsonElement foundUrl;
                if (foundProperty.TryGetProperty("url", out foundUrl))
                {
                    game.CoverUrl = (foundUrl.GetString() ?? "").Replace("t_thumb", "t_cover_big");
                }
            }

            //Try Get Description
            if (root.TryGetProperty("summary", out foundProperty))
            {
                game.Description = foundProperty.GetString();
            }
            else
            {
                game.Description = "This game does not have a description yet. You can contact us if you would like to add a description you made.";
            }

            //Try get publish date
            if (root.TryGetProperty("first_release_date", out foundProperty))
            {
                game.PublishDate = Conversions.UnixTimeToDateTime(foundProperty.GetUInt32());
            }

        }
        return game;
    }
}
