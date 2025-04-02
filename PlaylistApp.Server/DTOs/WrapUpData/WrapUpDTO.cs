namespace PlaylistApp.Server.DTOs.WrapUpData;

public class WrapUpDTO
{
    public List<WrapUpCarouselGameDTO> GamesPlayed { get; set; } = [];
    public List<WrapUpHourBarGraphDTO> BarGraphGameData { get; set; } = [];
    public GraphDTO? HourGraph { get; set; }
    public TopGameDTO? TopGame { get; set; }
    public List<AchievementGroupDTO> AchievementGroups { get; set; } = [];
    public int TrophiesEarned { get; set; }
}
