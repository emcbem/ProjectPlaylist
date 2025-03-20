
using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;

namespace PlaylistApp.Server.Services.IGDBSyncServices.DatabaseProcessors;

public class DatabaseProcessor : IDatabaseProcessor
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;
    private const int BatchSize = 500; 

    public DatabaseProcessor(IDbContextFactory<PlaylistDbContext> dbContextFactory)
    {
        this.dbContextFactory = dbContextFactory;
    }

    private async Task ProcessBatchAsync<T>(
    IEnumerable<T> items,
    Func<PlaylistDbContext, IEnumerable<T>, Task> dbAction) // Change IEnumerable<T> to List<T>
    {
        if (items == null || !items.Any()) return;

        await using var context = await dbContextFactory.CreateDbContextAsync();

        foreach (var batch in items.Chunk(BatchSize))
        {
            await dbAction(context, batch);
        }
    }

    public async Task AddRangeAsync<T>(IEnumerable<T> itemsToAdd)
    {
        await ProcessBatchAsync(itemsToAdd, async (context, batch) =>
        {
            if (batch is not null)
            {
                foreach (var item in batch)
                {
                    context.Add(item!);
                }
            }
            await context.SaveChangesAsync();
        });
    }

    public async Task DeleteRangeAsync<T>(IEnumerable<T> itemsToRemove)
    {
        await ProcessBatchAsync(itemsToRemove, async (context, batch) =>
        {
            if (batch is not null)
            {
                foreach (var item in batch)
                {
                    context.Remove(item!);
                }
            }
            await context.SaveChangesAsync();
        });
    }

    public async Task UpdateRangeAsync<T>(IEnumerable<T> itemsToUpdate)
    {
        await ProcessBatchAsync(itemsToUpdate, async (context, batch) =>
        {
            if (batch is not null)
            {
                foreach (var item in batch)
                {
                    context.Update(item!);
                }
            }
            await context.SaveChangesAsync();

        });
    }
}
