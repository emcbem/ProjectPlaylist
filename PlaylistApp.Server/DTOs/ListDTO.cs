
using PlaylistApp.Server.Data;

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

public static class ListConverter
{
	public static ListDTO ToDTO(this List list)
	{
		if (list is null)
		{
			return new ListDTO();
		}

		return new ListDTO()
		{
			CreationDate = list.DateMade,
			IsPublic = list.IsPublic,
			Name = list.ListName,
			OwnerName = list.User.Username,
			Id = list.Id,
			Games = list.ListGames.Select(x => x.ToDTO()).ToList(),
		};
	}
}
