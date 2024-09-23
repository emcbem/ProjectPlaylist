using System.Text.Json;
using System.Text.Json.Nodes;
using FluentAssertions;
using IGDB;
using Microsoft.EntityFrameworkCore;
using Moq;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.Services.IGDBServices;

namespace PlaylistApp.Test.Services;

public class IGDBCompanyServiceTests
{
    private JsonObject TestData()
    {
        var jsonObject = new JsonObject
        {
            ["id"] = 5807,
            ["change_date_category"] = 7,
            ["created_at"] = 1433023268,
            ["name"] = "Creative Services EARS",
            ["slug"] = "creative-services-ears",
            ["start_date"] = -2533161600,
            ["start_date_category"] = 0,
            ["updated_at"] = 1433023268,
            ["url"] = "https://www.igdb.com/companies/creative-services-ears",
            ["checksum"] = "a1140233-f863-8357-bbbd-8f1d70933813",
            ["logo"] = new JsonObject
            {
                ["id"] = 2828,
                ["alpha_channel"] = false,
                ["animated"] = false,
                ["height"] = 240,
                ["image_id"] = "cl26k",
                ["url"] = "//images.igdb.com/igdb/image/upload/t_thumb/cl26k.jpg",
                ["width"] = 240,
                ["checksum"] = "b26b5b0d-67cf-6707-b93c-519523b38b6a"
            },
            ["description"] = "Test Desc",
        };
        return jsonObject;
    }

    [Fact]
    public void AbleToParseNameFromJson()
    {
        IDbContextFactory<PlaylistDbContext> db = new Mock<IDbContextFactory<PlaylistDbContext>>().Object;
        IGDBClient client = new IGDBClient("", "");

        IGDBCompanyService companyService = new IGDBCompanyService(db, client);

        var testData = TestData();

        var company = companyService.ParseCompanyIntoLocalCompany(testData);

        company.CompanyName.Should().Be("Creative Services EARS");
    }

    [Fact]
    public void AbleToParseSlugFromJson()
    {
        IDbContextFactory<PlaylistDbContext> db = new Mock<IDbContextFactory<PlaylistDbContext>>().Object;
        IGDBClient client = new IGDBClient("", "");

        IGDBCompanyService companyService = new IGDBCompanyService(db, client);

        var testData = TestData();

        var company = companyService.ParseCompanyIntoLocalCompany(testData);

        company.Slug.Should().Be("creative-services-ears");
    }

    [Fact]
    public void AbleToParseLogoFromJson()
    {
        IDbContextFactory<PlaylistDbContext> db = new Mock<IDbContextFactory<PlaylistDbContext>>().Object;
        IGDBClient client = new IGDBClient("", "");

        IGDBCompanyService companyService = new IGDBCompanyService(db, client);

        var testData = TestData();

        var company = companyService.ParseCompanyIntoLocalCompany(testData);

        company.LogoUrl.Should().Be("//images.igdb.com/igdb/image/upload/t_1080p/cl26k.jpg");
    }

    [Fact]
    public void AbleToParseCompanyEvenIfLogoIsNull()
    {
        IDbContextFactory<PlaylistDbContext> db = new Mock<IDbContextFactory<PlaylistDbContext>>().Object;
        IGDBClient client = new IGDBClient("", "");

        IGDBCompanyService companyService = new IGDBCompanyService(db, client);

        var testData = TestData();
        testData.Remove("logo");

        var company = companyService.ParseCompanyIntoLocalCompany(testData);

        company.LogoUrl.Should().BeNull();
    }

    [Fact]
    public void AbleToParseStartdateFromJson()
    {
        IDbContextFactory<PlaylistDbContext> db = new Mock<IDbContextFactory<PlaylistDbContext>>().Object;
        IGDBClient client = new IGDBClient("", "");

        IGDBCompanyService companyService = new IGDBCompanyService(db, client);

        var testData = TestData();

        var company = companyService.ParseCompanyIntoLocalCompany(testData);

        company.StartDate.Should().BeSameDateAs(new DateTime(1889, 1, 1));
    }

    [Fact]
    public void AbleToParseStartdateEvenIfNull()
    {
        IDbContextFactory<PlaylistDbContext> db = new Mock<IDbContextFactory<PlaylistDbContext>>().Object;
        IGDBClient client = new IGDBClient("", "");

        IGDBCompanyService companyService = new IGDBCompanyService(db, client);

        var testData = TestData();
        testData.Remove("start_date");

        var company = companyService.ParseCompanyIntoLocalCompany(testData);

        company.StartDate.Should().BeNull();
    }

    [Fact]
    public void AbleToParseDescriptionFromJson()
    {
        IDbContextFactory<PlaylistDbContext> db = new Mock<IDbContextFactory<PlaylistDbContext>>().Object;
        IGDBClient client = new IGDBClient("", "");

        IGDBCompanyService companyService = new IGDBCompanyService(db, client);

        var testData = TestData();

        var company = companyService.ParseCompanyIntoLocalCompany(testData);

        company.Description.Should().Be("Test Desc");
    }

    [Fact]
    public void AbleToParseDescriptionEvenIfNull()
    {
        IDbContextFactory<PlaylistDbContext> db = new Mock<IDbContextFactory<PlaylistDbContext>>().Object;
        IGDBClient client = new IGDBClient("", "");

        IGDBCompanyService companyService = new IGDBCompanyService(db, client);

        var testData = TestData();
        testData.Remove("description");

        var company = companyService.ParseCompanyIntoLocalCompany(testData);

        company.Description.Should().BeNull();
    }
}