using FluentAssertions;
using IGDB;
using IGDB.Models;
using NSubstitute;
using PlaylistApp.Server.Services.IGDBSyncServices.Builders;
using PlaylistApp.Server.Services.IGDBSyncServices.DataGetters;
using PlaylistApp.Server.Services.IGDBSyncServices.Downloader;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlaylistApp.Test.Services;

public class PlatformGameBuilderTests
{
    [Fact]
    public void AbleToCreateAPlatfromGameBuilder()
    {
        var dataGetter = Substitute.For<IDataGetter>();
        var pgbuilder = new PlatformGameBuilder(dataGetter);
    }

    [Fact]
    public async Task WhenAPlatformGameBuilderStartsThenItCallsTheWebsiteCSVEndpoint()
    {
        var dataGetter = Substitute.For<IDataGetter>();
        dataGetter.GetWebsites().Returns(new List<Website>() { new Website() { Id = 2, Url = "wow" } });
        dataGetter.GetExternalGames().Returns(new List<ExternalGame>() { new ExternalGame() { Id = 2, Url = "wow2" } });
        var pgbuilder = new PlatformGameBuilder(dataGetter);

        await pgbuilder.Setup();

        await dataGetter.Received().GetWebsites();
    }

    [Fact]
    public async Task WhenAPlatformGameBuilderStartsWhenItRecievesWebsiteDataItParsesItIntoADictionaryAndThenStoresTheData()
    {
        var dataGetter = Substitute.For<IDataGetter>();
        dataGetter.GetWebsites().Returns(new List<Website>() { new Website() { Id = 2, Url = "wow" } });
        dataGetter.GetExternalGames().Returns(new List<ExternalGame>() { new ExternalGame() { Id = 2, Url = "wow2" } });
        var pgbuilder = new PlatformGameBuilder(dataGetter);

        await pgbuilder.Setup();

        pgbuilder.WebsiteIdToWebsites[2][0].Url.Should().Be("wow");
    }

    [Fact]
    public async Task WhenPlatformBuilderStartsThenItGetsTheExternalGamesData()
    {
        var dataGetter = Substitute.For<IDataGetter>();
        dataGetter.GetWebsites().Returns(new List<Website>() { new Website() { Id = 2, Url = "wow" } });
        dataGetter.GetExternalGames().Returns(new List<ExternalGame>() { new ExternalGame() { Id = 2, Url = "wow2" } });
        var pgbuilder = new PlatformGameBuilder(dataGetter);

        await pgbuilder.Setup();

        await dataGetter.Received().GetExternalGames();
    }

    [Fact]
    public async Task WehnAPlatformBuilderStartsThenTheDictionarySHouldGetMadeForExternalGames()
    {
        var dataGetter = Substitute.For<IDataGetter>();
        dataGetter.GetWebsites().Returns(new List<Website>() { new Website() { Id = 2, Url = "wow" } });
        dataGetter.GetExternalGames().Returns(new List<ExternalGame>() { new ExternalGame() { Id = 2, Url = "wow2" } });
        var pgbuilder = new PlatformGameBuilder(dataGetter);

        await pgbuilder.Setup();

        pgbuilder.ExternalIdToExternalGames[2][0].Url.Should().Be("wow2");
    }

}
