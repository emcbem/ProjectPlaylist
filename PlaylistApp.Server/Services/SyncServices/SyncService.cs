using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;

namespace PlaylistApp.Server.Services.SyncServices;

public class SyncService
{
	private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;

	public SyncService(IDbContextFactory<PlaylistDbContext> dbContextFactory)
	{
		this.dbContextFactory = dbContextFactory;
	}

	public async Task SyncSteamAchievementsWithCorespondingPlatformGames()
	{
		var context = await dbContextFactory.CreateDbContextAsync();


		var achievements = new List<Data.Achievement>();
		var query = @"
				SELECT a.id, p0.id as platform_game_id, a.image_url, a.achievement_name, a.achievement_desc
				FROM playlistdb.game AS g
				JOIN playlistdb.platform_game AS p
				  ON g.id = p.game_id
				  AND p.platform_id = 6
				JOIN playlistdb.achievement AS a
				  ON p.id = a.platform_game_id
				JOIN playlistdb.platform_game AS p0
				  ON g.id = p0.game_id
				  AND p0.platform_id IN (48, 167, 8, 9, 11, 12, 38, 49, 165, 169)";

		using (var command = context.Database.GetDbConnection().CreateCommand())
		{
			command.CommandText = query;
			context.Database.OpenConnection();

			using (var result = command.ExecuteReader())
			{
				while (result.Read())
				{
					var achievement = new Data.Achievement()
					{
						PlatformGameId = result.GetInt32(1), 
						ImageUrl = result.GetString(2), 
						AchievementName = result.GetString(3),
                        AchievementDesc = result.IsDBNull(4) ? null : result.GetString(4),
						ExternalId = "THISISSYNCEDFROMSTEAMDONOTUSETHISHOE"
                    };
					achievements.Add(achievement);
				}
			}
		}



		context.Achievements.AddRange(achievements);
		
		await context.SaveChangesAsync();
	}


}

class AchievementDto
{
	public int AchievementId { get; set; }
	public int PlatformGameId { get; set; }
	public string ImageUrl { get; set; }
	public string AchievementName { get; set; }
	public string AchievementDesc { get; set; }
}
