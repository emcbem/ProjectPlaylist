using IGDB;
using NSubstitute;
using PlaylistApp.Server.Services.IGDBSyncServices.Builders;
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
        var downloader = Substitute.For<IDownloader>();
        var pgbuilder = new PlatformGameBuilder(downloader);
    }

    [Fact]
    public async Task WhenAPlatformGameBuilderStartsThenItCallsTheWebsiteCSVEndpoint()
    {
        var downloader = Substitute.For<IDownloader>();
        var pgbuilder = new PlatformGameBuilder(downloader);

        await pgbuilder.Setup();

        await downloader.Received().DownloadAsync(IGDBClient.Endpoints.Websites);
    }

    [Fact]
    public async Task WhenAPlatformGameBuilderStartsWhenItRecievesWebsiteDataItParsesItIntoADictionaryAndThenStoresTheData()
    {

    }

}
