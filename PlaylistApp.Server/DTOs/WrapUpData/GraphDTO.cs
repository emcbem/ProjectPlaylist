namespace PlaylistApp.Server.DTOs.WrapUpData;

public class GraphDTO
{
    public string Title { get; set; } = "";
    public List<string> X_Ticks { get; set; } = [];
    public List<string> Y_Ticks { get; set; } = [];
    public string X_Axis { get; set; } = "";
    public string Y_Axis { get; set; } = "";
    public List<double> Data { get; set; } = [];
 }
