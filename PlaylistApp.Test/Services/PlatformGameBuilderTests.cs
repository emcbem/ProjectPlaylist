using IGDB;
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
        var pgbuilder = new PlatformGameBuilder(dataGetter);

        await pgbuilder.Setup();

        await dataGetter.Received().GetWebsites();
    }

    [Fact]
    public async Task WhenAPlatformGameBuilderStartsWhenItRecievesWebsiteDataItParsesItIntoADictionaryAndThenStoresTheData()
    {

    }

}
