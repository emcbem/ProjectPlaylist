using IGDB.Models;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using System.Reflection.Metadata.Ecma335;

namespace PlaylistApp.Server.Services.IGDBServices
{
    public static class Translator
    {
    

        public static List<Data.Game> TranslateIGDBGamesIntoPersonalData(List<IGDB.Models.Game> igdbGames, List<Cover> covers, List<AgeRating> ratings)
        {
            var coversDict = covers.Where(p => p.Id != null).ToDictionary(p => (long)p!.Id!, p => p);
            var ratingsDict = ratings.Where(p => p.Category == AgeRatingCategory.ESRB).ToDictionary(p => p?.Id ?? 0, p => p);

            Cover? cover = null;
            AgeRating? rating = null;



            return igdbGames.Select(igdbGame =>
            {
                var game = new Data.Game();

                game.IgdbId = (int?)igdbGame.Id;
                game.Description = igdbGame.Summary;

                if (coversDict.TryGetValue(igdbGame.Cover.Id ?? 0, out cover))
                {
                    game.CoverUrl = cover.Url;
                }
                else
                {
                    game.CoverUrl = null;
                }

                if (igdbGame.AgeRatings.Ids is not null && igdbGame.AgeRatings.Ids.Count() > 0 && igdbGame.AgeRatings.Ids.Any(i => ratingsDict.TryGetValue(i, out rating)))
                {
                    game.AgeRating = rating!.Rating.ToString();
                }
                else
                {
                    game.AgeRating = null;
                }

                game.PublishDate = igdbGame.FirstReleaseDate?.DateTime.ToUniversalTime() ?? (new DateTime()).ToUniversalTime();
                game.Title = igdbGame.Name;
                game.PlatformIds = igdbGame.Platforms.Ids.Select(x => (int)x).ToList();
                game.GenreIds = igdbGame.Genres.Ids.Select(x => (int)x).ToList();
                game.InvolvedCompanyIds = igdbGame.InvolvedCompanies.Ids.Select(x => (int)x).ToList();
                game.Checksum = igdbGame?.Checksum?.ToString();

                return game;
            }).Where(p => p is not null).ToList()!;
        }

        public static List<Data.Company> TranslateIGDBCompaniesIntoPersonalData(List<IGDB.Models.Company> igdbCompanies, List<IGDB.Models.CompanyLogo> igdbLogos)
        {
            var logoDict = igdbLogos.ToDictionary(x => (int)x!.Id!);
            CompanyLogo? logo = null;

            return igdbCompanies.Select(igdbCompany =>
            {
                var company = new Data.Company();

                company.StartDate = igdbCompany.StartDate?.DateTime.ToUniversalTime();
                company.Description = igdbCompany.Description;
                company.CompanyName = igdbCompany.Name.Substring(0, Math.Min(igdbCompany.Name.Length, 64));
                company.IgdbId = (int?)igdbCompany.Id;
                company.Checksum = igdbCompany.Checksum;


                if (logoDict.TryGetValue((int)igdbCompany!.Logo!.Id!, out logo))
                {
                    company.LogoUrl = logo.Url;
                }

                company.Slug = igdbCompany.Slug;


                return company;
            }).ToList();
        }

        public static List<Data.Platform> TranslateIGDBPlatformsIntoPersonalData(List<IGDB.Models.Platform> igdbPlatforms, List<PlatformLogo> igdbPlatformLogos)
        {
            var logoDict = igdbPlatformLogos.ToDictionary(x => (long)x.Id!);
            PlatformLogo? logo = null;

            return igdbPlatforms.Select(igdbPlatform =>
            {
                var platform = new Data.Platform();


                platform.Id = (int?)igdbPlatform.Id ?? -1;
                platform.PlatformName = igdbPlatform.Name.Substring(0, Math.Min(igdbPlatform.Name.Length, 40));
                platform.Checksum = igdbPlatform.Checksum;
                platform.IgdbId = (int?)igdbPlatform.Id;

                if (logoDict.TryGetValue((long)igdbPlatform.PlatformLogo.Id!, out logo))
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

        public static List<Data.Genre> TranslateIGDBGenresIntoPersonalData(List<IGDB.Models.Genre> igdbGenres)
        {
            return igdbGenres.Select(x => new Data.Genre()
            {
                Id = (int?)x.Id ?? -1,
                GenreName = x.Name,
                IgdbId = (int?)x.Id,
                Checksum = x.Checksum,
            }).ToList();
        }

        public static List<Data.InvolvedCompany> TranslateIGDBInvolvedCompaniesIntoLocalInvolvedCompanies(List<IGDB.Models.InvolvedCompany> igdbInvolvedCompanies, List<Data.Game> localGames)
        {
            var localGameDict = localGames.ToDictionary(x => x.IgdbId is not null ? (int)x.IgdbId : -1, x => x!.Id);
            int gameId;


            return igdbInvolvedCompanies.Select(x =>
            {
                if (localGameDict.TryGetValue((int)x.Game.Id!, out gameId))
                {

                    return new Data.InvolvedCompany()
                    {
                        CompanyId = (int)x.Company.Id!,
                        IsDeveloper = x.Developer,
                        IsPublisher = x.Publisher,
                        GameId = gameId,
                        Id = (int?)x.Id ?? 0
                    };
                }
                return null;
            }).Where(x => x is not null).Cast<Data.InvolvedCompany>().ToList();
        }

        public static List<Data.GameGenre> TranslateIGDBGamesIntoLocalGameGenres(List<IGDB.Models.Game> igdbGames, List<Data.Game> localGames)
        {
            var localGameDict = localGames.ToDictionary(x => x.IgdbId is not null ? (int)x.IgdbId : -1, x => x!.Id);
            int gameId;

            return igdbGames.Select(x =>
            {
                if (localGameDict.TryGetValue((int)x.Id!, out gameId))
                {
                    return x.Genres.Ids.Select(y =>
                    {
                        return new GameGenre()
                        {
                            GameId = gameId,
                            GenreId = (int)y
                        };
                    }).ToList();
                }
                return null;
            }).Where(x => x is not null).ToList().SelectMany(x => x!).ToList();
        }

        public static List<Data.PlatformGame> TranslateIGDBGamesIntoPersonalPlatformGameManyToMany(List<Data.Game> localGames, List<IGDB.Models.Game> igdbGames, List<ExternalGame> igdbExternalGames, List<Website> igdbWesites)
        {
            var websiteDict = igdbWesites.ToDictionary(x => x?.Id ?? 0);
            var externalDict = igdbExternalGames.ToDictionary(x => x?.Id ?? 0);
            var localGameDict = localGames.ToDictionary(x => (int)x.IgdbId!, x => x.Id);

            var platformToExternalCategory = new Dictionary<int, ExternalCategory>
            {
                {1, ExternalCategory.Steam}, {3, ExternalCategory.Steam}, {6, ExternalCategory.Steam}, {14, ExternalCategory.Steam}, {163, ExternalCategory.Steam},
                {162, ExternalCategory.Oculus}, {384, ExternalCategory.Oculus}, {385, ExternalCategory.Oculus}, {387, ExternalCategory.Oculus},
                {7, ExternalCategory.PlaystationStoreUS}, {8, ExternalCategory.PlaystationStoreUS}, {9, ExternalCategory.PlaystationStoreUS},
                {46, ExternalCategory.PlaystationStoreUS}, {48, ExternalCategory.PlaystationStoreUS}, {165, ExternalCategory.PlaystationStoreUS}, {167, ExternalCategory.PlaystationStoreUS},
                // {11, ExternalCategory.XBox}, {12, ExternalCategory.Xbox}, {49, ExternalCategory.Xbox}, {169, ExternalCategory.Xbox},
            };

            var platformGames = new List<PlatformGame>();

            foreach (var igdbGame in igdbGames)
            {
                if (!localGameDict.TryGetValue((int)igdbGame.Id!, out int gameId))
                {
                    continue;
                }

                foreach (var platformId in igdbGame.Platforms.Ids)
                {
                    var platformGame = new PlatformGame
                    {
                        GameId = gameId,
                        PlatformId = (int)platformId,
                    };

                    platformGame.PlatformUrl = igdbGame.Websites.Ids
                        .Select(id => websiteDict.GetValueOrDefault(id))
                        .FirstOrDefault(w => w?.Category == WebsiteCategory.Official)?.Url;

                    if (platformToExternalCategory.TryGetValue((int)platformId, out var externalCategory))
                    {
                        platformGame.PlatformKey = igdbGame.ExternalGames.Ids
                            .Select(id => externalDict.GetValueOrDefault(id))
                            .FirstOrDefault(e => e?.Category == externalCategory)?.Uid;
                    }

                    platformGames.Add(platformGame);
                }
            }

            return platformGames;
        }

        

    }

}
