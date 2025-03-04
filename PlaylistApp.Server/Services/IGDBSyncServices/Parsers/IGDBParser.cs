﻿using CsvHelper.Configuration;
using CsvHelper;
using IGDB.Models;
using IGDB;
using System.Globalization;
using PlaylistApp.Server.Data;

namespace PlaylistApp.Server.Services.IGDBSyncServices.Parsers
{
    public class IGDBParser : IIGDBParser
    {
        public List<IGDB.Models.Company> ParseCompanyCsv(string companyLocalPath)
        {
            var config = new CsvConfiguration(CultureInfo.InvariantCulture);
            var companies = new List<IGDB.Models.Company>();

            using (var reader = new StreamReader(companyLocalPath))
            using (var csv = new CsvReader(reader, config))
            {
                csv.Read();
                csv.ReadHeader();
                IGDB.Models.Company company;
                while (csv.Read())
                {
                    company = new IGDB.Models.Company();

                    company.Id = csv.GetField<long?>("id");
                    company.Url = csv.GetField("url");
                    var companyLogoId = csv.GetField<long?>("logo");
                    company.Logo = companyLogoId.HasValue ? new IdentityOrValue<CompanyLogo>(companyLogoId.Value) : new IdentityOrValue<CompanyLogo>(-1);
                    company.Slug = csv.GetField("slug");
                    company.Published = new IdentitiesOrValues<IGDB.Models.Game>(ParseLongArray(csv.GetField<string?>("published")!));
                    company.Name = csv.GetField("name");
                    company.Description = csv.GetField("description");
                    company.StartDate = csv.GetField<DateTime?>("start_date") ?? new DateTime();
                    company.Checksum = csv.GetField<string>("checksum");

                    companies.Add(company);
                }

            }
            return companies;
        }

        public List<PlatformLogo> ParsePlatformLogoCsv(string platformsLogoLocalPath)
        {
            var config = new CsvConfiguration(CultureInfo.InvariantCulture);
            var platformLogos = new List<PlatformLogo>();

            using (var reader = new StreamReader(platformsLogoLocalPath))
            using (var csv = new CsvReader(reader, config))
            {
                csv.Read();
                csv.ReadHeader();
                PlatformLogo platformLogo;
                while (csv.Read())
                {
                    platformLogo = new PlatformLogo();

                    platformLogo.Id = csv.GetField<long?>("id");
                    platformLogo.Url = csv.GetField("url");

                    platformLogos.Add(platformLogo);
                }
            }
            return platformLogos;
        }

        public List<IGDB.Models.Platform> ParsePlatformCsv(string platformsLocalPath)
        {
            var config = new CsvConfiguration(CultureInfo.InvariantCulture);
            var platforms = new List<IGDB.Models.Platform>();

            using (var reader = new StreamReader(platformsLocalPath))
            using (var csv = new CsvReader(reader, config))
            {
                csv.Read();
                csv.ReadHeader();
                IGDB.Models.Platform platform;
                while (csv.Read())
                {
                    platform = new IGDB.Models.Platform();

                    platform.Id = csv.GetField<long?>("id");
                    platform.Name = csv.GetField("name");
                    var platformLogoId = csv.GetField<long?>("platform_logo");
                    platform.Checksum = csv.GetField<string>("checksum");

                    platform.PlatformLogo = platformLogoId.HasValue ? new IdentityOrValue<PlatformLogo>(platformLogoId.Value) : new IdentityOrValue<PlatformLogo>(-1);

                    platforms.Add(platform);
                }
                return platforms;
            }
        }

        public List<CompanyLogo> ParseCompanyLogoCsv(string companyLogoPath)
        {
            var config = new CsvConfiguration(CultureInfo.InvariantCulture);
            var companyLogos = new List<CompanyLogo>();

            using (var reader = new StreamReader(companyLogoPath))
            using (var csv = new CsvReader(reader, config))
            {
                csv.Read();
                csv.ReadHeader();
                CompanyLogo companyLogo;
                while (csv.Read())
                {
                    companyLogo = new CompanyLogo();

                    companyLogo.Id = csv.GetField<long?>("id");

                    companyLogo.Url = csv.GetField("url");

                    companyLogos.Add(companyLogo);
                }
            }
            return companyLogos;
        }

        public List<AgeRating> ParseRatingCsv(string ratingLocalPath)
        {
            var config = new CsvConfiguration(CultureInfo.InvariantCulture);
            var ratings = new List<AgeRating>();

            using (var reader = new StreamReader(ratingLocalPath))
            using (var csv = new CsvReader(reader, config))
            {
                csv.Read();
                csv.ReadHeader();
                AgeRating rating;
                while (csv.Read())
                {
                    rating = new AgeRating();

                    rating.Id = csv.GetField<long?>("id");
                    rating.Category = (AgeRatingCategory?)csv.GetField<long?>("category");
                    rating.Rating = (AgeRatingTitle?)csv.GetField<long?>("rating");

                    ratings.Add(rating);
                }
            }
            return ratings;
        }

        public List<Cover> ParseCoverCsv(string coverLocalPath)
        {
            var config = new CsvConfiguration(CultureInfo.InvariantCulture);
            var covers = new List<Cover>();

            using (var reader = new StreamReader(coverLocalPath))
            using (var csv = new CsvReader(reader, config))
            {
                csv.Read();
                csv.ReadHeader();
                Cover cover;
                while (csv.Read())
                {
                    cover = new Cover();

                    cover.Id = csv.GetField<long?>("id");
                    cover.Url = csv.GetField("url")?.Replace("t_thumb", "t_cover_big") ?? "";

                    covers.Add(cover);
                }
            }
            return covers;
        }

        public List<ExternalGame> ParseExternalGameCsv(string externalGamePath)
        {
            var config = new CsvConfiguration(CultureInfo.InvariantCulture);
            var externalGames = new List<ExternalGame>();

            using (var reader = new StreamReader(externalGamePath))
            using (var csv = new CsvReader(reader, config))
            {
                csv.Read();
                csv.ReadHeader();
                while (csv.Read())
                {
                    var externalGame = new ExternalGame();

                    externalGame.Category = (ExternalCategory)csv.GetField<long?>("category")!;
                    externalGame.Id
                        = csv.GetField<long?>("id");
                    externalGame.Uid = csv.GetField("uid");

                    var gameId = csv.GetField<long?>("game");
                    externalGame.Game = gameId.HasValue ? new IdentityOrValue<IGDB.Models.Game>(gameId.Value) : new IdentityOrValue<IGDB.Models.Game>(-1);

                    var platformId = csv.GetField<long?>("platform");
                    externalGame.Platform = platformId.HasValue ? new IdentityOrValue<IGDB.Models.Platform>(platformId.Value) : new IdentityOrValue<IGDB.Models.Platform>(-1);

                    externalGames.Add(externalGame);
                }
            }
            return externalGames;
        }

        public List<Website> ParseWebsiteCsv(string websiteLocalPath)
        {
            var config = new CsvConfiguration(CultureInfo.InvariantCulture);
            var websites = new List<Website>();

            using (var reader = new StreamReader(websiteLocalPath))
            using (var csv = new CsvReader(reader, config))
            {
                csv.Read();
                csv.ReadHeader();
                while (csv.Read())
                {
                    var website = new Website();
                    website.Url = csv.GetField<string>("url");
                    website.Id = csv.GetField<long?>("id");
                    website.Category = (WebsiteCategory)csv.GetField<long?>("category")!;

                    var gameId = csv.GetField<long?>("game");

                    website.Game = gameId.HasValue ? new IdentityOrValue<IGDB.Models.Game>(gameId.Value) : new IdentityOrValue<IGDB.Models.Game>(-1);

                    websites.Add(website);
                }
            }
            return websites;
        }

        public List<IGDB.Models.Genre> ParseGenreCsv(string genreLocalPath)
        {
            var config = new CsvConfiguration(CultureInfo.InvariantCulture);
            var genres = new List<IGDB.Models.Genre>();

            using (var reader = new StreamReader(genreLocalPath))
            using (var csv = new CsvReader(reader, config))
            {
                csv.Read();
                csv.ReadHeader();
                while (csv.Read())
                {
                    var genre = new IGDB.Models.Genre();
                    genre.Name = csv.GetField<string>("name");
                    genre.Id = csv.GetField<long?>("id");
                    genre.Checksum = csv.GetField<string>("checksum");
                    genres.Add(genre);
                }
            }

            return genres ?? [];
        }
        public List<IGDB.Models.InvolvedCompany> ParseInvolvedCompanyCsv(string involvedCompanyPath)
        {
            var config = new CsvConfiguration(CultureInfo.InvariantCulture);
            var involvedCompanies = new List<IGDB.Models.InvolvedCompany>();

            using (var reader = new StreamReader(involvedCompanyPath))
            using (var csv = new CsvReader(reader, config))
            {
                csv.Read();
                csv.ReadHeader();
                while (csv.Read())
                {
                    var involvedCompany = new IGDB.Models.InvolvedCompany();
                    involvedCompany.Developer = csv.GetField<string?>("developer") == "t";
                    involvedCompany.Publisher = csv.GetField<string?>("publisher") == "t";
                    var companyId = csv.GetField<long?>("company");

                    involvedCompany.Company = companyId.HasValue ? new IdentityOrValue<IGDB.Models.Company>(companyId.Value) : new IdentityOrValue<IGDB.Models.Company>(-1);
                    var gameId = csv.GetField<long?>("game");
                    involvedCompany.Game = gameId.HasValue ? new IdentityOrValue<IGDB.Models.Game>(gameId.Value) : new IdentityOrValue<IGDB.Models.Game>(-1);

                    involvedCompany.Id = csv.GetField<int>("id");

                    involvedCompanies.Add(involvedCompany);
                }
            }
            return involvedCompanies;
        }

        public List<IGDB.Models.Game> ParseGameCsv(string gameLocalPath)
        {
            return ParseCsv<IGDB.Models.Game>(gameLocalPath, csv =>
            {
                var game = new IGDB.Models.Game();
                game.Id = csv.GetField<long?>("id");
                game.Name = csv.GetField<string>("name");
                game.Summary = csv.GetField<string>("summary");
                game.Category = (Category)csv.GetField<long>("category");
                game.GameModes = new IdentitiesOrValues<GameMode>(ParseLongArray(csv.GetField<string>("game_modes")!));
                game.Themes = new IdentitiesOrValues<Theme>(ParseLongArray(csv.GetField<string>("themes")!));
                game.Genres = new IdentitiesOrValues<IGDB.Models.Genre>(ParseLongArray(csv.GetField<string>("genres")!));
                game.FirstReleaseDate = csv.GetField<DateTimeOffset?>("first_release_date");
                game.Platforms = new IdentitiesOrValues<IGDB.Models.Platform>(ParseLongArray(csv.GetField<string>("platforms")!));
                var coverId = csv.GetField<long?>("cover");
                game.Cover = coverId.HasValue ? new IdentityOrValue<Cover>(coverId.Value) : new IdentityOrValue<Cover>(-1);
                game.MultiplayerModes = new IdentitiesOrValues<MultiplayerMode>(ParseLongArray(csv.GetField<string>("multiplayer_modes")!));
                game.InvolvedCompanies = new IdentitiesOrValues<IGDB.Models.InvolvedCompany>(ParseLongArray(csv.GetField<string>("involved_companies")!));
                game.AgeRatings = new IdentitiesOrValues<AgeRating>(ParseLongArray(csv.GetField<string>("age_ratings")!));
                game.ExternalGames = new IdentitiesOrValues<ExternalGame>(ParseLongArray(csv.GetField("external_games")!));
                game.Websites = new IdentitiesOrValues<Website>(ParseLongArray(csv.GetField("websites")!));
                var parentGameId = csv.GetField<long?>("parent_game");
                game.ParentGame = parentGameId.HasValue ? new IdentityOrValue<IGDB.Models.Game>(parentGameId.Value) : new IdentityOrValue<IGDB.Models.Game>(-1);
                game.Checksum = csv.GetField<string>("checksum");
                return game;
            });

            
        }

        private List<T> ParseCsv<T>(string filePath, Func<CsvReader, T> mapFunc)
        {
            var config = new CsvConfiguration(CultureInfo.InvariantCulture);
            var result = new List<T>();

            using (var reader = new StreamReader(filePath))
            using (var csv = new CsvReader(reader, config))
            {
                csv.Read();
                csv.ReadHeader();
                while (csv.Read())
                {
                    result.Add(mapFunc(csv));
                }
            }
            return result;
        }



        public static long[] ParseLongArray(string input)
        {
            // Remove any unwanted characters (like '{' and '}') and split by ','
            if (string.IsNullOrWhiteSpace(input))
                return new long[0]; // Return an empty array if the input is null or empty

            var trimmedInput = input.Trim('{', '}');
            var stringArray = trimmedInput.Split(',')
                                          .Where(x => !string.IsNullOrWhiteSpace(x)) // Filter out empty strings
                                          .Select(x => x.Trim()) // Trim spaces
                                          .ToArray();

            // Convert to long[] and handle any potential parsing errors
            return stringArray.Select(long.Parse).ToArray();
        }



    }
}
