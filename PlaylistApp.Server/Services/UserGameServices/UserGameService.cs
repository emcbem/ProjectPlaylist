using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;

namespace PlaylistApp.Server.Services.UserGameServices;

public class UserGameService : IUserGameService
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;

    public UserGameService(IDbContextFactory<PlaylistDbContext> dbContextFactory)
    {
        this.dbContextFactory = dbContextFactory;
    }
    public async Task<int> AddUserGame(AddUserGameRequest request)
    {
        using var context = dbContextFactory.CreateDbContext();

        var platformGame = await context.PlatformGames
            .Where(x => x.Id == request.PlatformGameId)
            .FirstOrDefaultAsync();

        if (platformGame == null)
        {
            return 0;
        }

        var User = await context.UserAccounts
            .Where(x => x.Guid == request.UserId)
            .FirstOrDefaultAsync();

        if (User == null)
        {
            return 0;
        }

        var newUserGame = new UserGame()
        {
            DateAdded = DateTime.UtcNow,
            PlatformGame = platformGame,
            PlatformGameId = request.PlatformGameId,
            User = User,
            UserId = User.Id,
            TimePlayed = 0,
        };

        context.Add(newUserGame);
        await context.SaveChangesAsync();
        return newUserGame.Id;
    }

    public async Task<UserGameDTO> GetUserGameById(int id)
    {
        using var context = dbContextFactory.CreateDbContext();

        var userGame = await context.UserGames
            .Where(x => x.Id == id)
            .FirstOrDefaultAsync();

        if (userGame == null)
        {
            return new UserGameDTO();
        }
        return userGame.ToDTO();
    }

    public async Task<List<UserGameDTO>> GetUserGameByUser(Guid userId)
    {
        using var context = dbContextFactory.CreateDbContext();

        var User = await context.UserAccounts
            .Where(x => x.Guid == userId)
            .FirstOrDefaultAsync();

        if (User == null)
        {
            return new List<UserGameDTO>();
        }

        var userGames = await context.UserGames
            .Where(x => x.UserId == User.Id)
            .ToListAsync();

        if (!userGames.Any())
        {
            return new List<UserGameDTO>();
        }

        return userGames.Select(x => x.ToDTO()).ToList();
    }

    public async Task<bool> RemoveUserGame(int id)
    {
        using var context = dbContextFactory.CreateDbContext();

        var userGame = await context.UserGames
            .Where(x => x.Id == id)
            .FirstOrDefaultAsync();

        if (userGame == null)
        {
            return false;
        }

        context.UserGames.Remove(userGame);
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<UserGameDTO> UpdateUserGame(UpdateUserGameRequest request)
    {
        using var context = dbContextFactory.CreateDbContext();

        var userGame = await context.UserGames
            .Where(x => x.Id == request.Id)
            .FirstOrDefaultAsync();

        if (userGame == null)
        {
            return new UserGameDTO();
        }

        UserGame newUserGame = new UserGame()
        {
            TimePlayed = request.TimePlayed,
            DateAdded = request.DateAdded,
            Id = request.Id,
        };

        context.UserGames.Update(newUserGame);
        await context.SaveChangesAsync();

        return newUserGame.ToDTO();
    }
}
