using FluentAssertions;
using PlaylistApp.Server.Interfaces;
using PlaylistApp.Server.Services.IGDBServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlaylistApp.Test.Services
{
    internal class TestChecksum : IChecksum
    {
        public string? Checksum { get; set; }
        public int? IgdbId { get; set; }

        public TestChecksum(string? checksum, int? igdbId)
        {
            Checksum = checksum;
            IgdbId = igdbId;
        }
    }
    public class DifferenceFinderTests
    {
        [Fact]
        public void GivenADifferenceFinderWhenAskedToFindTheDifferenceBetweenTwoListsItIsCorrect()
        {
            var origialIds = new List<IChecksum>() { new TestChecksum("checksumChange", 10), new TestChecksum("missing", -10)};
            var igdbIdToChecksumDict = new Dictionary<int, string>() {
                { 10,"newChecksum" },
                { 7, "needToAdd"}
            };

            var Differences = DifferenceFinder.FindItemsThatNeedAttention(origialIds, igdbIdToChecksumDict);

            Differences.ChecksumsThatChanged!.Count().Should().Be(1);
            Differences.ChecksumsThatChanged!.FirstOrDefault(x => x.Checksum == "checksumChange").Should().NotBeNull();

            Differences.IgdbIdsNeededToBeAdded!.Count().Should().Be(1);
            Differences.IgdbIdsNeededToBeAdded.Should().Contain(7);

            Differences.PersonalItemsThatAreNoLongerInIgdb!.Count().Should().Be(1);
            Differences.PersonalItemsThatAreNoLongerInIgdb!.FirstOrDefault(x => x.Checksum == "missing").Should().NotBeNull();
        }

    }
}
