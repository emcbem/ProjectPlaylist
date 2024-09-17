using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PlaylistApp.Server.Services.IGDBServices;
using System.Text.Json.Nodes;
using Microsoft.OpenApi;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using Moq;
using IGDB;
using System.Security.Cryptography.Xml;

namespace PlaylistApp.Test.Services;

public class IGDBServiceTest
{
    [Fact]
    public void IGDBServiceIsAbleToTranslateAGameIntoOurGameClass()
    {
      
        var igdbService = new IGDBService();
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
            ["alternative_names"] = new JsonArray
            {
                40085,
                40086,
                40087
            },
            ["category"] = 0,
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
            ["created_at"] = 1584788069,
            ["external_games"] = new JsonArray
            {
                1977891
            },
            ["first_release_date"] = 1474416000,
            ["game_modes"] = new JsonArray
            {
                1
            },
            ["genres"] = new JsonArray
            {
                34
            },
            ["involved_companies"] = new JsonArray
            {
                94670,
                94671
            },
            ["keywords"] = new JsonArray
            {
                962,
                1313,
                1937,
                24359
            },
            ["name"] = "Test-Game-NOW",
            ["platforms"] = new JsonArray
            {
                46
            },
            ["player_perspectives"] = new JsonArray
            {
                5
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
            ["screenshots"] = new JsonArray
            {
                918066,
                918067,
                918068
            },
            ["similar_games"] = new JsonArray
            {
                60248,
                60959,
                110576,
                132092,
                142445,
                225683,
                225684,
                238887,
                238897,
                238904
            },
            ["slug"] = "Test-Game-NOW",
            ["storyline"] = "This is a test desc",
            ["summary"] = "This is a test desc",
            ["tags"] = new JsonArray
            {
                31,
                44,
                268435490,
                536871874,
                536872225,
                536872849,
                536895271
            },
            ["themes"] = new JsonArray
            {
                31,
                44
            },
            ["updated_at"] = 1681992241,
            ["url"] = "https://www.igdb.com/games/maji-kyun-renaissance",
            ["videos"] = new JsonArray
            {
                34610
            },
            ["websites"] = new JsonArray
            {
                137453,
                137454,
                434195
            },
            ["checksum"] = "21773c78-1eff-c813-e5b4-9b6e8841eded",
            ["game_localizations"] = new JsonArray
            {
                12809
            }
        };

        var game = igdbService.ParseGameIntoLocalGame(jsonObject);

        game.Title.Should().Be("Test-Game-NOW");
        game.AgeRating.Should().Be("E");
        game.CoverUrl.Should().Be("//images.igdb.com/igdb/image/upload/t_cover_big/co49os.jpg");
        game.Description.Should().Be("This is a test desc");
        game.PublishDate.Should().BeSameDateAs(new DateTime(2002, 3, 8));
        game.IdgbId.Should().Be(131913);
    }
}
