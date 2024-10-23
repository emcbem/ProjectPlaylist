using PlaylistApp.Server.Data.Enums;

namespace PlaylistApp.Server.Requests.GetRequests;

public class GetGamesRequest
{
    public int Page { get; set; }
    public int PageSize { get; set; } = 25;
    public string Title { get; set; } = "";
    public List<int> GenreIds { get; set; } = [];
    public List<int> PlatformIds { get; set; } = [];
    public List<int> CompanyIds { get; set; } = [];
    public OrderingMethod OrderingMethod { get; set; }
}
