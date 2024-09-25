namespace PlaylistApp.Server.DTOs;

public class ListDTO
{
    public int Id { get; set; }
    public string Name { get; set; } = "Default Name";
    public string OwnerName { get; set; } = "Default Owner";
    public bool IsPublic { get; set; }
    public DateTime CreationDate { get; set; }
    public DateTime LastUpdatedDate { get; set; }
    public List<ListGameDTO> Games { get; set; } = new List<ListGameDTO>();
}
