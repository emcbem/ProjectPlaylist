using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IGDB;
using NSubstitute;
using PlaylistApp.Server.Services.IGDBSyncServices.DataGetters;
using PlaylistApp.Server.Services.IGDBSyncServices.Downloader;
using PlaylistApp.Server.Services.IGDBSyncServices.Parsers;

namespace PlaylistApp.Test.Services;

public class IGDBDataGetterTests
{
    public static IEnumerable<object[]> GetIGDBMethods()
    {
        yield return new object[] { (Func<IGDBDataGetter, Task>)(getter => getter.GetWebsites()), IGDBClient.Endpoints.Websites};
        yield return new object[] { (Func<IGDBDataGetter, Task>)(getter => getter.GetGames()), IGDBClient.Endpoints.Games };
        yield return new object[] { (Func<IGDBDataGetter, Task>)(getter => getter.GetCovers()), IGDBClient.Endpoints.Covers };
        yield return new object[] { (Func<IGDBDataGetter, Task>)(getter => getter.GetCompanyLogos()), IGDBClient.Endpoints.CompanyLogos };
        yield return new object[] { (Func<IGDBDataGetter, Task>)(getter => getter.GetCompanys()), IGDBClient.Endpoints.Companies};
        yield return new object[] { (Func<IGDBDataGetter, Task>)(getter => getter.GetExternalGames()), IGDBClient.Endpoints.ExternalGames };
        yield return new object[] { (Func<IGDBDataGetter, Task>)(getter => getter.GetGenres()), IGDBClient.Endpoints.Genres };
        yield return new object[] { (Func<IGDBDataGetter, Task>)(getter => getter.GetInvolvedCompanys()), IGDBClient.Endpoints.InvolvedCompanies };
        yield return new object[] { (Func<IGDBDataGetter, Task>)(getter => getter.GetPlatformLogos()), IGDBClient.Endpoints.PlatformLogos };
        yield return new object[] { (Func<IGDBDataGetter, Task>)(getter => getter.GetPlatforms()), IGDBClient.Endpoints.Platforms };
        yield return new object[] { (Func<IGDBDataGetter, Task>)(getter => getter.GetRatings()), IGDBClient.Endpoints.AgeRating };
    }

    [Theory]
    [MemberData(nameof(GetIGDBMethods))]
    public async Task WhenUsingTheDataGetter_CorrectlyCallsTheCorrectDownloader(Func<IGDBDataGetter, Task> methodToTest, string expectedEndpoint)
    {
        var downloader = Substitute.For<IDownloader>();
        var igdbParser = Substitute.For<IIGDBParser>();

        var igdbGetter = new IGDBDataGetter(downloader, igdbParser);

        await methodToTest(igdbGetter);

        await downloader.Received().DownloadAsync(expectedEndpoint);
    }

    public static IEnumerable<object[]> GetIGDBMethodsAndParsers()
    {
        yield return new object[] { (Func<IGDBDataGetter, Task>)(getter => getter.GetWebsites()), IGDBClient.Endpoints.Websites, (Action<IIGDBParser>)(parser => parser.Received().ParseWebsiteCsv("testLocations")) };
        yield return new object[] { (Func<IGDBDataGetter, Task>)(getter => getter.GetGames()), IGDBClient.Endpoints.Games, (Action<IIGDBParser>)(parser => parser.Received().ParseGameCsv("testLocations")) };
        yield return new object[] { (Func<IGDBDataGetter, Task>)(getter => getter.GetCovers()), IGDBClient.Endpoints.Covers, (Action<IIGDBParser>)(parser => parser.Received().ParseCoverCsv("testLocations")) };
        yield return new object[] { (Func<IGDBDataGetter, Task>)(getter => getter.GetCompanyLogos()), IGDBClient.Endpoints.CompanyLogos, (Action<IIGDBParser>)(parser => parser.Received().ParseCompanyLogoCsv("testLocations")) };
        yield return new object[] { (Func<IGDBDataGetter, Task>)(getter => getter.GetCompanys()), IGDBClient.Endpoints.Companies, (Action<IIGDBParser>)(parser => parser.Received().ParseCompanyCsv("testLocations")) };
        yield return new object[] { (Func<IGDBDataGetter, Task>)(getter => getter.GetExternalGames()), IGDBClient.Endpoints.ExternalGames, (Action<IIGDBParser>)(parser => parser.Received().ParseExternalGameCsv("testLocations")) };
        yield return new object[] { (Func<IGDBDataGetter, Task>)(getter => getter.GetGenres()), IGDBClient.Endpoints.Genres, (Action<IIGDBParser>)(parser => parser.Received().ParseGenreCsv("testLocations")) };
        yield return new object[] { (Func<IGDBDataGetter, Task>)(getter => getter.GetInvolvedCompanys()), IGDBClient.Endpoints.InvolvedCompanies, (Action<IIGDBParser>)(parser => parser.Received().ParseInvolvedCompanyCsv("testLocations")) };
        yield return new object[] { (Func<IGDBDataGetter, Task>)(getter => getter.GetPlatformLogos()), IGDBClient.Endpoints.PlatformLogos, (Action<IIGDBParser>)(parser => parser.Received().ParsePlatformLogoCsv("testLocations")) };
        yield return new object[] { (Func<IGDBDataGetter, Task>)(getter => getter.GetPlatforms()), IGDBClient.Endpoints.Platforms, (Action<IIGDBParser>)(parser => parser.Received().ParsePlatformCsv("testLocations")) };
        yield return new object[] { (Func<IGDBDataGetter, Task>)(getter => getter.GetRatings()), IGDBClient.Endpoints.AgeRating, (Action<IIGDBParser>)(parser => parser.Received().ParseRatingCsv("testLocations")) };
    }

    [Theory]
    [MemberData(nameof(GetIGDBMethodsAndParsers))]
    public async Task WhenDataGetter_CorrectParserShouldBeCalled(Func<IGDBDataGetter, Task> methodToTest,
                                                                 string expectedEndpoint,
                                                                 Action<IIGDBParser> verifyParserCall)
    {
        var downloader = Substitute.For<IDownloader>();
        downloader.DownloadAsync(expectedEndpoint).Returns("testLocations");

        var igdbParser = Substitute.For<IIGDBParser>();
        var igdbGetter = new IGDBDataGetter(downloader, igdbParser);

        await methodToTest(igdbGetter);

        verifyParserCall(igdbParser);
    }

}
