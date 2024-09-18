namespace PlaylistApp.Server.DTOs;

public class FriendDTO
{
    public int Id { get; set; }
    public bool IsAccepted { get; set; }
    public DateTime? DateAccepted { get; set; }
    public UserDTO? BaseUser { get; set; }
    public UserDTO? ReceivingUser { get; set; }
}
