namespace PlaylistApp.Server.DTOs;

public class ListGameDTO
{
    public int Id { get; set; }
    public int ListId { get; set; }
    public GameDTO? Game { get; set; }
    public DateTime DateAdded { get; set; } 
}
