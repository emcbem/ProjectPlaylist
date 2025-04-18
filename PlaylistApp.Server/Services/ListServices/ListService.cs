﻿using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;
using System.Reflection.Metadata.Ecma335;

namespace PlaylistApp.Server.Services.ListServices;

public class ListService : IListService
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;

    public ListService(IDbContextFactory<PlaylistDbContext> dbContextFactory)
    {
        this.dbContextFactory = dbContextFactory;
    }
    public async Task<int> AddList(AddListRequest request)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var user = await context.UserAccounts
            .Where(x => x.Guid == request.UserId)
            .FirstOrDefaultAsync();

        if (user == null)
        {
            return 0;
        }

        List newList = new List()
        {
            DateMade = request.CreationDate.ToUniversalTime(),
            IsPublic = request.IsPublic,
            ListName = request.Name,
            UserId = user.Id,
        };

        context.Add(newList);
        await context.SaveChangesAsync();
        return newList.Id;
    }

    public async Task<bool> DeleteList(int Id)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var list = await context.Lists
            .Where(x => x.Id == Id)
            .FirstOrDefaultAsync();

        if (list == null)
        {
            return false;
        }

        context.Remove(list);
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<List<ListDTO>> GetAllListsByUser(Guid userId)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var userLists = await context.Lists
            .Include(x => x.User)
                .ThenInclude(x => x.UserImage)
            .Include(x => x.ListGames)
                .ThenInclude(x => x.Game)
            .Where(x => x.User.Guid == userId)
            .ToListAsync();

        if (!userLists.Any())
        {
            return new List<ListDTO>();
        }

        return userLists.Select(x => x.ToDTO()).ToList();
    }

    public async Task<List<ListDTO>> GetAllListsByName(string name)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var lists = await context.Lists
            .Include(x => x.User)
                .ThenInclude(x => x.UserImage)
            .Include(x => x.ListGames)
                .ThenInclude(x => x.Game)
            .Where(x => x.ListName == name)
            .ToListAsync();

        if (!lists.Any())
        {
            return new List<ListDTO>();
        }

        return lists.Select(x => x.ToDTO()).ToList();
    }

    public async Task<List?> GetActualListById(int Id)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var list = await context.Lists
            .Include(x => x.User)
                .ThenInclude(x => x.UserImage)
            .Include(x => x.ListGames)
                .ThenInclude(x => x.Game)
            .Where(x => x.Id == Id)
            .FirstOrDefaultAsync();

        return list;
    }

    public async Task<ListDTO> GetListById(int Id)
    {
        var list = await GetActualListById(Id);

        if (list == null)
        {
            return new ListDTO();
        }

        return list.ToDTO();
    }

    public async Task<ListDTO> UpdateList(UpdateListRequest request)
    {
        using var context = await dbContextFactory.CreateDbContextAsync();

        var list = await context.Lists
            .Include(x => x.User)
                .ThenInclude(x => x.UserImage)
            .Include(x => x.ListGames)
                .ThenInclude(x => x.Game)
            .FirstOrDefaultAsync(x => x.Id == request.ListId);

        if (list == null)
        {
            return new ListDTO(); 
        }

        list.ListName = request.ListName;
        list.IsPublic = request.IsPublic;

        if (request.GamesToRemove is not null && request.GamesToRemove.Count > 0)
        {
            var gameIdsToRemove = request.GamesToRemove.Select(x => x.Game!.Id).ToList();

            var listGamesToRemove = await context.ListGames
                .Where(x => x.ListId == request.ListId && gameIdsToRemove.Contains(x.GameId))
                .ToListAsync();

            context.ListGames.RemoveRange(listGamesToRemove);
        }

        if (request.NewGames is not null && request.NewGames.Count > 0)
        {
            var existingGameIds = list.ListGames.Select(lg => lg.GameId).ToHashSet();

            var listGamesToAdd = request.NewGames
                .Where(ng => !existingGameIds.Contains(ng.Id)) 
                .Select(x => new ListGame
                {
                    DateAdded = DateTime.UtcNow,
                    GameId = x.Id,
                    ListId = request.ListId,
                })
                .ToList();

            context.ListGames.AddRange(listGamesToAdd);
        }

        await context.SaveChangesAsync();
        return list.ToDTO(); 
    }

}
