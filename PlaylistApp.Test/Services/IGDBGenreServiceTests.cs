using FluentAssertions;
using IGDB;
using Microsoft.EntityFrameworkCore;
using Moq;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.Services.IGDBServices.Genre;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Nodes;
using System.Threading.Tasks;

namespace PlaylistApp.Test.Services;

public class IGDBGenreServiceTests
{
    [Fact]
    public void IGDBGenreAbleToGetNamePropertyFromJsonProperly()
    {
        IDbContextFactory<PlaylistDbContext> db = new Mock<IDbContextFactory<PlaylistDbContext>>().Object;
        IGDBClient client = new IGDBClient("", "");

        var igdbGenre = new IGDBGenreService(db, client);

        var jsonObject = new JsonObject
        {
            ["id"] = 2,
            ["created_at"] = 1297639288,
            ["name"] = "Point-and-click",
            ["slug"] = "point-and-click",
            ["updated_at"] = 1323382086,
            ["url"] = "https://www.igdb.com/genres/point-and-click",
            ["checksum"] = "b295f28a-5f68-fc3e-5de2-f3195e10d160"
        };

        var value = igdbGenre.ParseGenreIntoLocalGenre(jsonObject);

        value.GenreName.Should().Be("Point-and-click");
        value.Id.Should().Be(2);

    }
}
