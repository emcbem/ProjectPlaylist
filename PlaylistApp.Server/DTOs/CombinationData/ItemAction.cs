namespace PlaylistApp.Server.DTOs.CombinationData;

public class ItemAction
{
    public List<ItemOption> ItemOptions { get; set; } = new();
    public string ErrorType { get; set; } = "";
}
