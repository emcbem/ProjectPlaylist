using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.DeleteRequests;

namespace PlaylistApp.Server.Services.ReviewLikeServices;

public class ReviewLikeService : IReviewLikeService
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;

    public ReviewLikeService(IDbContextFactory<PlaylistDbContext> dbContextFactory)
    {
        this.dbContextFactory = dbContextFactory;
    }
    public async Task<bool> AddReviewLike(AddReviewLikeRequest request)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var user = await context.UserAccounts
            .Where(x => x.Guid == request.Userid)
            .FirstOrDefaultAsync();

        if (user == null)
        {
            return false;
        }

        var possibleLike = await context.ReviewLikes
            .Where(x => x.User.Guid == request.Userid)
            .Where(x => x.GameReviewId == request.GameReviewId)
            .FirstOrDefaultAsync();

        if (possibleLike is not null)
        {
            return false;
        }

        ReviewLike newReviewLike = new ReviewLike()
        {
            DateLiked = DateTime.UtcNow,
            IsLike = request.IsLike,
            GameReviewId = request.GameReviewId,
            UserId = user.Id,
        };

        context.Add(newReviewLike);
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<List<GameReviewDTO>> GetAllByUser(Guid userId)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var gameReviews = await context.GameReviews
            .Include(x => x.Game)
            .Include(x => x.User)
                .ThenInclude(x => x.UserImage)
            .Where(x => x.User.Guid == userId)
            .ToListAsync();

        if (!gameReviews.Any()) 
        {
            return new List<GameReviewDTO>();
        }

        return gameReviews.Select(x => x.ToDTO()).ToList(); 
    }

    public async Task<bool> RemoveReviewLike(RemoveReviewLikeRequest request)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var reviewLike = await context.ReviewLikes
            .Where(x => x.User.Guid == request.UserId)
            .Where(x => x.GameReviewId == request.GameReviewId)
            .FirstOrDefaultAsync();

        if (reviewLike == null)
        {
            return false;
        }

        context.Remove(reviewLike);
        await context.SaveChangesAsync();
        return true;
    }
}
