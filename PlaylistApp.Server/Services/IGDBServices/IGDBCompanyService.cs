using IGDB;
using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace PlaylistApp.Server.Services.IGDBServices;

public class IGDBCompanyService
{
    private readonly IDbContextFactory<PlaylistDbContext> contextFactory;
    private readonly IGDBClient igdbClient;

    public IGDBCompanyService(IDbContextFactory<PlaylistDbContext> contextFactory, IGDBClient igdbClient)
    {
        this.contextFactory = contextFactory;
        this.igdbClient = igdbClient;
    }

    public async Task<JsonArray> GetCompaniesFromIGDB(string query)
    {
        var values = await igdbClient.QueryWithResponseAsync<IGDB.Models.Game>(IGDBClient.Endpoints.Companies, query);

        //transform the data into values we can actually use
        var array = JsonNode.Parse(values.StringContent ?? "");

        return array!.AsArray();
    }

    public async Task PostGamesToDatabase(JsonArray games)
    {
        using var context = contextFactory.CreateDbContext();

        foreach (var game in games)
        {
            context.Companies.Add(ParseCompanyIntoLocalCompany(game!.AsObject()));
        }
        await context.SaveChangesAsync();
    }

    public Company ParseCompanyIntoLocalCompany(JsonObject jsonCompany)
    {
        var company = new Company();

        var companyString = jsonCompany.ToString();

        using (var document = JsonDocument.Parse(companyString))
        {
            var root = document.RootElement;
            JsonElement foundProperty;

            if(root.TryGetProperty("name", out foundProperty))
            {
                var companyName = foundProperty.GetString();
                if (companyName == null)
                {
                    throw new Exception("No name found for property: name.");
                }
                else
                {
                    company.CompanyName = companyName;
                }
            }

            if(root.TryGetProperty("slug", out foundProperty))
            {
                var companySlug = foundProperty.GetString();
                if (companySlug == null)
                {
                    throw new Exception("No name found for property: slug.");
                }
                else
                {
                    company.Slug = companySlug;
                }
            }

            if (root.TryGetProperty("logo", out foundProperty))
            {
                JsonElement foundUrl;

                if (foundProperty.TryGetProperty("url", out foundUrl))
                {
                    company.LogoUrl = foundUrl.GetString()?.Replace("thumb", "1080p") ?? null;
                }
            }

            if(root.TryGetProperty("start_date", out foundProperty))
            {
                company.StartDate = (Conversions.UnixTimeToDateTime(foundProperty.GetInt64(), true));
            }

            if(root.TryGetProperty("description", out foundProperty))
            {
                company.Description = foundProperty.GetString();
            }
        }
        return company;
    }

}
