namespace PlaylistApp.Server.DTOs;

public class CompanyDTO
{
    public int Id { get; set; }
    public string? Slug { get; set; }
    public string? Name { get; set; }
    public DateTime? StartDate { get; set; }
    public string? LogoURL { get; set; }
}
