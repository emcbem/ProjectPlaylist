using System.Runtime.CompilerServices;
using IGDB.Models;
using Org.BouncyCastle.Asn1.Mozilla;

namespace PlaylistApp.Server.Services.IGDBSyncServices.Parsers
{
    public interface IIGDBParser
    {
        public List<Company> ParseCompanyCsv(string companyLocalPath);
        public List<PlatformLogo> ParsePlatformLogoCsv(string platformLogoLocalPath);
        public List<Platform> ParsePlatformCsv(string platformLocalPath);
        public List<CompanyLogo> ParseCompanyLogoCsv(string companyLogoLocalPath);
        public List<AgeRating> ParseRatingCsv(string ratingLocalPath);
        public List<Cover> ParseCoverCsv(string coverLocalPath);
        public List<ExternalGame> ParseExternalGameCsv(string externalGameLocalPath);
        public List<Website> ParseWebsiteCsv(string websiteLocalPath);
        public List<Genre> ParseGenreCsv(string genreLocalPath);
        public List<InvolvedCompany> ParseInvolvedCompanyCsv(string involvedCompanyLocalPath);
        public List<IGDB.Models.Game> ParseGameCsv(string gameLocalPath);
    }
}
