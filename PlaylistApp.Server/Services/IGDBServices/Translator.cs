using IGDB.Models;

namespace PlaylistApp.Server.Services.IGDBServices
{
    public static class Translator
    {
        public static List<Data.Game> TranslateIGDBGamesIntoPersonalData(List<IGDB.Models.Game> igdbGames, List<Cover> covers, List<AgeRating> ratings)
        {
            return igdbGames.Select(igdbGame => new Data.Game()
            {
                IdgbId = (int?)igdbGame.Id,
                Description = igdbGame.Summary,
                CoverUrl = igdbGame.Cover.Id is not null && igdbGame.Cover.Id != -1 ? covers.FirstOrDefault(cover => cover.Id == igdbGame.Cover.Id)?.Url ?? "" : "",
                AgeRating = igdbGame.AgeRatings.Ids is not null && igdbGame.AgeRatings.Ids.Count() > 0 ? ratings.FirstOrDefault(rating =>
                    igdbGame.AgeRatings.Ids.Any(igdbRatingId => rating.Id == igdbRatingId &&
                    rating.Category == AgeRatingCategory.ESRB
                ))?.Rating.ToString() ?? "No Age Rating Found" : "No Age Rating Found",
                PublishDate = igdbGame.FirstReleaseDate?.DateTime.ToUniversalTime() ?? (new DateTime()).ToUniversalTime(),
                Title = igdbGame.Name,
            }).ToList();
        }

        public static List<Data.Company> TranslateIGDBCompaniesIntoPersonalData(List<IGDB.Models.Company> igdbCompanies, List<IGDB.Models.CompanyLogo> igdbLogos)
        {
            var logoDict = igdbLogos.ToDictionary(x => x.Id);
            CompanyLogo? logo = null;

            return igdbCompanies.Select(igdbCompany =>
            {
                var company = new Data.Company();

                company.Id = (int?)igdbCompany.Id ?? 0;
                company.StartDate = igdbCompany.StartDate?.DateTime.ToUniversalTime();
                company.Description = igdbCompany.Description;
                company.CompanyName = igdbCompany.Name.Substring(0, Math.Min(igdbCompany.Name.Length, 64));


                if (logoDict.TryGetValue(igdbCompany.Logo.Id, out logo))
                {
                    company.LogoUrl = logo.Url;
                }

                company.Slug = igdbCompany.Slug;


                return company;
            }).ToList();
        }

        public static List<Data.Platform> TranslateIGDBPlatformsIntoPersonalData(List<IGDB.Models.Platform> igdbPlatforms, List<PlatformLogo> igdbPlatformLogos)
        {
            var logoDict = igdbPlatformLogos.ToDictionary(x => x.Id);
            PlatformLogo? logo = null;

            return igdbPlatforms.Select(igdbPlatform =>
            {
                var platform = new Data.Platform();


                platform.Id = (int?)igdbPlatform.Id ?? -1;
                platform.PlatformName = igdbPlatform.Name.Substring(0, Math.Min(igdbPlatform.Name.Length, 40)); ;

                if (logoDict.TryGetValue(igdbPlatform.PlatformLogo.Id, out logo))
                {
                    platform.LogoUrl = logo.Url;
                }
                else
                {
                    platform.LogoUrl = "";
                }

                return platform;
            }).ToList();


        }
    }
}
