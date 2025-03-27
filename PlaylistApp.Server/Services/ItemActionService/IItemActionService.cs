
namespace PlaylistApp.Server.Services.ItemActionService
{
    public interface IItemActionService
    {
        Task ResolveDifferencesInAchievements(int newUserGameId, Guid userId);
    }
}