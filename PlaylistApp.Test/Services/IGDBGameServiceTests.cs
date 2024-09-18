using System.Text.Json.Nodes;
using FluentAssertions;
using IGDB;
using Microsoft.EntityFrameworkCore;
using Moq;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.Services.IGDBServices.Game;


namespace PlaylistApp.Test.Services;

public class IGDBGameServiceTest
{
    [Fact]
    public void IGDBServiceIsAbleToTranslateAGameIntoOurGameClass()
    {
        IDbContextFactory<PlaylistDbContext> db = new Mock<IDbContextFactory<PlaylistDbContext>>().Object;
        IGDBClient client = new IGDBClient("", "");

        var igdbService = new IGDBGameService(db, client);

        var jsonObject = new JsonObject
        {
            ["id"] = 131913,
            ["age_ratings"] = new JsonArray
            {
                new JsonObject
                {
                    ["id"] = 657973,
                    ["category"] = 1,
                    ["rating"] = 8
                }
            },
            ["cover"] = new JsonObject
            {
                ["id"] = 199180,
                ["alpha_channel"] = true,
                ["animated"] = false,
                ["game"] = 1180,
                ["height"] = 800,
                ["image_id"] = "co49os",
                ["url"] = "//images.igdb.com/igdb/image/upload/t_thumb/co49os.jpg",
                ["width"] = 600,
                ["checksum"] = "d8dc3244-4309-f1cf-5660-8308275c0344"
            },
            ["first_release_date"] = 1015545600,
            ["involved_companies"] = new JsonArray
            {
                94670,
                94671
            },
            ["name"] = "Test-Game-NOW",
            ["platforms"] = new JsonArray
            {
                46
            },
            ["release_dates"] = new JsonArray
            {
                new JsonObject {
                   ["date"] = 1015545600

                },
                new JsonObject {
                    ["date"] = 1181692800
                }
            },
            ["summary"] = "This is a test desc",
            ["url"] = "https://www.igdb.com/games/maji-kyun-renaissance"
        };

        var game = igdbService.ParseGameIntoLocalGame(jsonObject);

        game.Title.Should().Be("Test-Game-NOW");
        game.AgeRating.Should().Be("E");
        game.CoverUrl.Should().Be("//images.igdb.com/igdb/image/upload/t_cover_big/co49os.jpg");
        game.Description.Should().Be("This is a test desc");
        game.PublishDate.Should().BeSameDateAs(new DateTime(2002, 3, 8));
        game.IdgbId.Should().Be(131913);
    }

    [Fact]
    public void IGDBServiceIsAbleToTranslateAGameIntoOurGameClassWithALotOfNullParameters()
    {
        IDbContextFactory<PlaylistDbContext> db = new Mock<IDbContextFactory<PlaylistDbContext>>().Object;
        IGDBClient client = new IGDBClient("", "");

        var igdbService = new IGDBGameService(db, client);

        var jsonObject = new JsonObject
        {
            ["id"] = 131913,
            ["name"] = "Test-Game-NOW",
        };

        var game = igdbService.ParseGameIntoLocalGame(jsonObject);

        game.Title.Should().Be("Test-Game-NOW");
        game.AgeRating.Should().Be("NaN");
        game.CoverUrl.Should().BeNull();
        game.Description.Should().Be("This game does not have a description yet. You can contact us if you would like to add a description you made.");
        game.PublishDate.Should().BeNull();
        game.IdgbId.Should().Be(131913);
    }
}
