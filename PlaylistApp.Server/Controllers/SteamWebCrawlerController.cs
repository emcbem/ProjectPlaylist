using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.Services.Game;
using PlaylistApp.Server.Services.IGDBServices;
using PlaylistApp.Server.Services.PlatformGameServices;
using System;
using System.Diagnostics;
using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class SteamWebCrawlerController : Controller
{
    private readonly HttpClient client;
    private readonly IPlatformGameService gameService;
    private readonly UploadData uploader;
    private readonly string steamUrl = "https://steamcommunity.com/stats/";

    public SteamWebCrawlerController(HttpClient client, IPlatformGameService gameService, UploadData uploader)
    {
        this.client = client;
        this.gameService = gameService;
        this.uploader = uploader;
    }
   

    private static SemaphoreSlim semaphore = new SemaphoreSlim(10); // Limit to 10 concurrent requests (adjust as needed)

    [HttpGet]
    public async Task<IResult> FetchAchievementsAsync()
    {
        var games = await gameService.GetAllPlatformGames(new Requests.GetRequests.PlatformGameRequest() { Filter = "", PlatformID = 6 });
        var steamIds = games.Select(x => new { x.PlatformKey, x.id}).ToList();

        List<Task<List<Achievement>>> tasks = new List<Task<List<Achievement>>>();

        foreach (var id in steamIds)
        {
            tasks.Add(ProcessSteamAchievementAsync(id.PlatformKey, id.id));
        }

        // Wait for all tasks to complete
        await Task.WhenAll(tasks);

        // Aggregate results from all tasks
        var achievementLists = tasks.SelectMany(task => task.Result).ToList();

        await uploader.UploadAcievementsToDatabase(achievementLists);

        return Results.Created();
    }

    private async Task<List<Achievement>> ProcessSteamAchievementAsync(string steamId, int id)
    {
        await semaphore.WaitAsync(); // Wait for an available slot

        try
        {
            string url = $"{steamUrl}{steamId}/achievements";
            string htmlContent = "";
            try
            {
                // Send a GET request to the website
                HttpResponseMessage response = await client.GetAsync(url);
                response.EnsureSuccessStatusCode();
                htmlContent = await response.Content.ReadAsStringAsync();
            }
            catch (HttpRequestException e)
            {
                Console.WriteLine("Request error: " + e.Message);
            }

            // Extract images, titles, descriptions
            List<string> imageSrcs = ExtractMatches(htmlContent, @"<img\s+[^>]*src\s*=\s*['""]([^'""]+)['""][^>]*width\s*=\s*['""]64['""]");
            List<string> titles = ExtractMatches(htmlContent, @"<h3>([^<]+)</h3>");
            List<string> descriptions = ExtractMatches(htmlContent, @"<h5>([^<]*)</h5>");

            List<Achievement> achievements = new List<Achievement>();

            for (int i = 0; i < imageSrcs.Count; i++)
            {
                string img = imageSrcs[i];
                string title = i < titles.Count ? titles[i] : "Untitled";
                string description = i < descriptions.Count ? descriptions[i] : "No description available";
                
                achievements.Add(new Achievement(img, title, description) { PlatformGameId = id});
            }

            return achievements;
        }
        finally
        {
            semaphore.Release(); // Release the semaphore slot
        }
    }

    private List<string> ExtractMatches(string input, string pattern)
    {
        List<string> results = new List<string>();
        MatchCollection matches = Regex.Matches(input, pattern);
        foreach (Match match in matches)
        {
            results.Add(match.Groups[1].Value);
        }
        return results;
    }

}
