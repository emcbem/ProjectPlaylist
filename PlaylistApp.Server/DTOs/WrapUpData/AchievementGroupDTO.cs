namespace PlaylistApp.Server.DTOs.WrapUpData;

public class AchievementGroupDTO
{
    public string GameName { get; set; } = "";
    public List<WrapUpAchievementDTO> Achievements { get; set; } = [];
}
