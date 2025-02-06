
using PlaylistApp.Server.DTOs.CombinationData;

namespace PlaylistApp.Server.Services.SteamServices
{
	public interface ISteamOrchestrator
	{
		Task<List<ItemAction>> CallAllTheMethods(string steamId, int userId);
	}
}