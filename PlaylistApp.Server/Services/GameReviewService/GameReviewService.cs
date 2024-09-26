using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;

namespace PlaylistApp.Server.Services.GameReviewService;

public class GameReviewService : IGameReviewService
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;

    public GameReviewService(IDbContextFactory<PlaylistDbContext> dbContextFactory)
    {
        this.dbContextFactory = dbContextFactory;
    }
    public async Task<int> AddGameReview(AddGameReviewRequest request)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        GameReview newGameReview = new GameReview()
        {
            PublishDate = DateTime.UtcNow,
            GameId = request.GameId,
            Rating = request.Rating,
            Review = request.Text,
            UserId = request.UserId,
        };

        await context.AddAsync(newGameReview);
        await context.SaveChangesAsync();
        return newGameReview.Id;
    }

    public async Task<bool> DeleteGameReview(int gameReviewId)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var gameReview = await context.GameReviews
            .Include(x => x.Game)
            .Include(x => x.User)
                .ThenInclude(x => x.UserImage)
            .Where(x => x.Id == gameReviewId)
            .FirstOrDefaultAsync();

        if (gameReview == null)
        {
            return false;
        }

        context.Remove(gameReview);
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<List<GameReviewDTO>> GetAllGameReivewByGame(int gameId)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var gameReviews = await context.GameReviews
            .Include(x => x.Game)
            .Include(x => x.User)
                .ThenInclude(x => x.UserImage)
            .Where(x => x.GameId == gameId)
            .ToListAsync();

        if (!gameReviews.Any())
        {
            return new List<GameReviewDTO>();
        }

        return gameReviews.Select(x => x.ToDTO()).ToList();
    }

    public async Task<GameReviewDTO> GetGameReviewById(int gameReviewId)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var gameReview = await context.GameReviews
            .Include(x => x.Game)
            .Include(x => x.User)
                .ThenInclude(x => x.UserImage)
            .Where(x => x.Id == gameReviewId)
            .FirstOrDefaultAsync();

        if (gameReview == null)
        {
            return new GameReviewDTO();
        }

        return gameReview.ToDTO();
    }

    public async Task<GameReviewDTO> UpdateGameReview(UpdateGameReviewRequest request)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var gameReview = await context.GameReviews
            .Include(x => x.Game)
            .Include(x => x.User)
                .ThenInclude(x => x.UserImage)
            .Where(x => x.Id == request.GameReivewId)
            .FirstOrDefaultAsync();

        if (gameReview == null)
        {
            return new GameReviewDTO();
        }

        gameReview.LastEditDate = DateTime.UtcNow;
        context.Update(gameReview);
        await context.SaveChangesAsync();
        return gameReview.ToDTO();
    }
}
