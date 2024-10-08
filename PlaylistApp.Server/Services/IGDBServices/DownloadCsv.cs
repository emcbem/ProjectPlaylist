using IGDB;

namespace PlaylistApp.Server.Services.IGDBServices
{
    public class DownloadCsv
    {
        private readonly IGDBClient igdbClient;

        public DownloadCsv(IGDBClient igdbClient)
        {
            this.igdbClient = igdbClient;
        }
        public async Task<string> DownloadCSV(string Endpoint)
        {
            var result = await igdbClient.GetDataDumpEndpointAsync(Endpoint);
            var LocalPath = Path.Combine(Directory.GetCurrentDirectory(), "CSVs", result.FileName);
            await DownloadCSVFile(result.S3Url, LocalPath);
            return LocalPath;
        }


        public async Task DownloadCSVFile(string FileUrl, string LocalPath)
        {
            if (File.Exists(LocalPath))
            {
                return;
            }
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    var response = await client.GetAsync(FileUrl);
                    response.EnsureSuccessStatusCode();

                    using (var fileStream = new FileStream(LocalPath, FileMode.Create, FileAccess.Write, FileShare.None))
                    {
                        await response.Content.CopyToAsync(fileStream);
                        Console.WriteLine("File downloaded successfully.");
                    }
                }
                catch (HttpRequestException e)
                {
                    Console.WriteLine($"Request error: {e.Message}");
                }
            }
        }
    }
}
