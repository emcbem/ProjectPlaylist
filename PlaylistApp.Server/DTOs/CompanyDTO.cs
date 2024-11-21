using PlaylistApp.Server.Data;

namespace PlaylistApp.Server.DTOs;

public class CompanyDTO
{
    public int Id { get; set; }
    public string? Slug { get; set; }
    public string? Name { get; set; }
    public DateTime? StartDate { get; set; }
    public string? LogoURL { get; set; }
}

public static class CompanyConverter
{
	public static CompanyDTO ToDTO(this Company company)
	{
		if (company is null)
		{
			return new CompanyDTO();
		}

		return new CompanyDTO()
		{
			Id = company.Id,
			StartDate = company.StartDate,
			LogoURL = company.LogoUrl,
			Name = company.CompanyName,
			Slug = company.Slug,
		};
	}
}
