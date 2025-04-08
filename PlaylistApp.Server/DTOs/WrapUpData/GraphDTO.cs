namespace PlaylistApp.Server.DTOs.WrapUpData;

public class GraphDTO
{
    public string Title { get; set; } = "";
    public string X_Axis { get; set; } = "";
    public string Y_Axis { get; set; } = "";
    public List<HourGraphDataPoint> GraphDataPoints { get; set; } = [];
 }
