using PlaylistApp.Server.Data;

namespace PlaylistApp.Server.DTOs;

public class FriendDTO
{
    public int Id { get; set; }
    public bool IsAccepted { get; set; }
    public DateTime? DateAccepted { get; set; }
    public UserDTO? BaseUser { get; set; }
    public UserDTO? ReceivingUser { get; set; }
}

public static class FriendConverter
{
	public static FriendDTO ToDTO(this Friend friend)
	{
		if (friend is null)
		{
			return new FriendDTO();
		}

		return new FriendDTO()
		{
			Id = friend.Id,
			BaseUser = friend.Base.ToDTO(),
			ReceivingUser = friend.Recieved.ToDTO(),
			IsAccepted = friend.IsAccepted,
			DateAccepted = friend.AcceptedDate,
		};
	}
}
