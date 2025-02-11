namespace PlaylistApp.Server.Services.IGDBSyncServices.DatabaseProcessors;

public interface IDatabaseProcessor
{
    public Task AddRangeAsync<T>(IEnumerable<T> ItemsToAdd);
    public Task DeleteRangeAsync<T>(IEnumerable<T> ItemsToRemove);
    public Task UpdateRangeAsync<T>(IEnumerable<T> ItemsToUpdate);
}
