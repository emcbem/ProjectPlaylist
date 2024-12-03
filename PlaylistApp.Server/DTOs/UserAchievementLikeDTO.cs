using PlaylistApp.Server.Data;

namespace PlaylistApp.Server.DTOs;

public class UserAchievementLikeDTO
{
    public int Id { get; set; }
    public int UserAchievementId { get; set; }
    public Guid UserId { get; set; }    
    public bool? IsLike { get; set; }    
    public DateTime? DateLiked { get; set; }
}

public static class UserAchievementLikeConverter
{
	public static UserAchievementLikeDTO ToDTO(this AchievementLike userAchievementLike)
	{
		if (userAchievementLike is null)
		{
			return new UserAchievementLikeDTO();
		}

		return new UserAchievementLikeDTO()
		{
			Id = userAchievementLike.Id,
			DateLiked = userAchievementLike.DateLiked,
			IsLike = userAchievementLike.IsLike,
			UserAchievementId = userAchievementLike.UserAchievementId,
			UserId = userAchievementLike.User.Guid,
		};
	}
}