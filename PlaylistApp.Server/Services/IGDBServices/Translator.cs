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
            var logoDict = igdbLogos.ToDictionary(x => (int)x!.Id!);
            CompanyLogo? logo = null;

            return igdbCompanies.Select(igdbCompany =>
            {
                var company = new Data.Company();

                company.Id = (int?)igdbCompany.Id ?? 0;
                company.StartDate = igdbCompany.StartDate?.DateTime.ToUniversalTime();
                company.Description = igdbCompany.Description;
                company.CompanyName = igdbCompany.Name.Substring(0, Math.Min(igdbCompany.Name.Length, 64));


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
                platform.PlatformName = igdbPlatform.Name.Substring(0, Math.Min(igdbPlatform.Name.Length, 40)); ;

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
            }).ToList();
        }

        public static List<Data.InvolvedCompany> TranslateIGDBInvolvedCompaniesIntoLocalInvolvedCompanies(List<IGDB.Models.InvolvedCompany> igdbInvolvedCompanies, List<Data.Game> localGames)
        {
            var localGameDict = localGames.ToDictionary(x => x.IdgbId is not null ? (int)x.IdgbId : -1, x => x!.Id);
            int gameId;


#pragma warning disable CS8619 // Nullability of reference types in value doesn't match target type.
            return (List<Data.InvolvedCompany>)igdbInvolvedCompanies.Select(x =>
            {
                if (localGameDict.TryGetValue((int)x.Game.Id!, out gameId))
                {

                    return new Data.InvolvedCompany()
                    {
                        CompanyId = (int)x.Company.Id!,
                        IsDeveloper = x.Developer,
                        IsPublisher = x.Publisher,
                        GameId = gameId
                    };
                }
                return null;
            }).Where(x => x is not null).ToList();
#pragma warning restore CS8619 // Nullability of reference types in value doesn't match target type.
        }

        public static List<Data.GameGenre> TranslateIGDBGamesIntoLocalGameGenres(List<IGDB.Models.Game> igdbGames, List<Data.Game> localGames)
        {
            var localGameDict = localGames.ToDictionary(x => x.IdgbId is not null ? (int)x.IdgbId : -1, x => x!.Id);
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
            var localGameDict = localGames.ToDictionary(x => (int)x.IdgbId!, x => x.Id);

            //Sorry for doubting myself
            var PlatformToExternalPlatformCategory = new Dictionary<int, ExternalCategory>()
            {
                {1, ExternalCategory.Steam},
                {3, ExternalCategory.Steam},
                {6, ExternalCategory.Steam},
                {14, ExternalCategory.Steam},
                {163, ExternalCategory.Steam},

                {162, ExternalCategory.Oculus},
                {384, ExternalCategory.Oculus},
                {385, ExternalCategory.Oculus},
                {387, ExternalCategory.Oculus},

                {7, ExternalCategory.PlaystationStoreUS},
                {8, ExternalCategory.PlaystationStoreUS},
                {9, ExternalCategory.PlaystationStoreUS},
                {46, ExternalCategory.PlaystationStoreUS},
                {48, ExternalCategory.PlaystationStoreUS},
                {165, ExternalCategory.PlaystationStoreUS},
                {167, ExternalCategory.PlaystationStoreUS},


                //{11, ExternalCategory.XBox},
                //{12, ExternalCategory.Xbox},
                //{49, ExternalCategory.Xbox},
                //{169, ExternalCategory.Xbox},
                //Figure out what the heck the different categories of xbox there are IF we figure out the xbox api

            };

            Website? website = null;
            ExternalGame? externalGame = null;
            ExternalCategory externalCategory = ExternalCategory.Steam;

            List<PlatformGame> platformGames = new();
            PlatformGame platformGame;
            int gameId;
            int i = 3;

            foreach (var igdbGame in igdbGames)
            {
                foreach (var platformId in igdbGame.Platforms.Ids)
                {
                    platformGame = new Data.PlatformGame();
                    if (localGameDict.TryGetValue((int)igdbGame!.Id!, out gameId))
                    {
                        platformGame.GameId = gameId;
                    }
                    else
                    {
                        continue;
                    }

                    platformGame.PlatformId = (int)platformId;
                    platformGame.Id = i;
                    Website? igdbWebsite = igdbGame
                       .Websites
                       .Ids
                       .Select(id =>
                       {
                           if (websiteDict.TryGetValue(id, out website))
                           {
                               return website;
                           }
                           else
                           {
                               throw new Exception("There was no website?");
                           }
                       })
                       .FirstOrDefault(website => website.Category == WebsiteCategory.Official);

                    if (website is not null)
                    {
                        platformGame.PlatformUrl = igdbWebsite?.Url;
                    }

                    if (PlatformToExternalPlatformCategory.TryGetValue((int)platformId, out externalCategory))
                    {

                        ExternalGame? foundExternalGame = igdbGame
                            .ExternalGames
                            .Ids
                            .Select(id =>
                            {
                                if (externalDict.TryGetValue(id, out externalGame))
                                {
                                    return externalGame;
                                }
                                return null;
                            })
                            .FirstOrDefault(externalGame =>
                            {
                                if (externalGame is null)
                                {
                                    return false;
                                }
                                return externalGame.Category == externalCategory;
                            });

                        if (foundExternalGame != null)
                        {
                            platformGame.PlatformKey = foundExternalGame.Uid;
                        }
                    }

                    platformGames.Add(platformGame);

                    i++;

                }
            }

            return platformGames;
        }


    }
}
