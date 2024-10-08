﻿using Microsoft.EntityFrameworkCore;
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
        using var context = await dbContextFactory.CreateDbContextAsync();

        var User = await context.UserAccounts
            .Where(x => x.Guid == request.UserId)
            .FirstOrDefaultAsync();

        if (User is null)
        {
            return 0;
        }

        var newUserGame = new UserGame()
        {
            DateAdded = DateTime.UtcNow,
            PlatformGameId = request.PlatformGameId,
            UserId = User.Id,
            TimePlayed = 0,
        };

        if (newUserGame is null)
        {
            return 0;
        }

        var possibleUserGame = await context.UserGames
            .Where(x => x.UserId == newUserGame.UserId)
            .Where(x => x.PlatformGameId == request.PlatformGameId)
            .ToListAsync();

        if (possibleUserGame.Count > 0)
        {
            return 0;
        }

        await context.AddAsync(newUserGame);
        await context.SaveChangesAsync();
        return newUserGame.Id;
    }

    public async Task<UserGameDTO> GetUserGameById(int id)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var userGame = await context.UserGames
            .Include(x => x.PlatformGame)
                .ThenInclude(x => x.Game)
                    .ThenInclude(x => x.InvolvedCompanies)
                        .ThenInclude(x => x.Company)
            .Include(x => x.PlatformGame)
                .ThenInclude(x => x.Platform)
            .Include(x => x.User)
                .ThenInclude(x => x.UserImage)
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
        using var context = await dbContextFactory.CreateDbContextAsync();

        var User = await context.UserAccounts
            .Where(x => x.Guid == userId)
            .FirstOrDefaultAsync();

        if (User == null)
        {
            return new List<UserGameDTO>();
        }

        var userGames = await context.UserGames
            .Include(x => x.PlatformGame)
                .ThenInclude(x => x.Game)
                    .ThenInclude(x => x.InvolvedCompanies)
                        .ThenInclude(x => x.Company)
            .Include(x => x.PlatformGame)
                .ThenInclude(x => x.Platform)
            .Include(x => x.User)
                .ThenInclude(x => x.UserImage)
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
        using var context = await dbContextFactory.CreateDbContextAsync();

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
        using var context = await dbContextFactory.CreateDbContextAsync();

        var userGame = await context.UserGames
            .Where(x => x.PlatformGameId == request.PlatformGameId)
            .FirstOrDefaultAsync();

        if (userGame == null)
        {
            return new UserGameDTO();
        }

        userGame.TimePlayed = request.TimePlayed;
        userGame.DateAdded = request.DateAdded.ToUniversalTime();

        context.UserGames.Update(userGame);
        await context.SaveChangesAsync();

        return userGame.ToDTO();
    }
}
