using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.DeleteRequests;
using RestEase.Implementation;

namespace PlaylistApp.Server.Services.UserGenreService;

public class UserGenreService : IUserGenreService
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;

    public UserGenreService(IDbContextFactory<PlaylistDbContext> dbContextFactory)
    {
        this.dbContextFactory = dbContextFactory;
    }

    public async Task<bool> AddUserGenre(AddUserGenreRequest request)
    {
        using var context = dbContextFactory.CreateDbContext();

        var usr = await context.UserAccounts.Where(x => x.Guid == request.UserId)
            .FirstOrDefaultAsync();

        if (usr == null) { return false; }

        var newUserGenre = new UserGenre() 
        { 
            UserId = usr.Id, 
            GenreId = request.GenreId 
        };

        await context.UserGenres.AddAsync(newUserGenre);
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteUserGenre(RemoveUserGenreRequest request)
    {
        using var context = dbContextFactory.CreateDbContext();

        var usr = await context.UserAccounts.Where(x => x.Guid == request.UserId)
            .FirstOrDefaultAsync();

        if (usr == null) { return false; }

        var userGenre = await context.UserGenres
            .Where(x => x.GenreId == request.GenreId && x.UserId == usr.Id)
            .FirstOrDefaultAsync();

        if (userGenre == null) { return false; }

        context.UserGenres.Remove(userGenre);
        await context.SaveChangesAsync();

        return true;
    }

    public async Task<List<GenreDTO>> GetAllByUser(Guid id)
    {
        using var context = dbContextFactory.CreateDbContext();

        var usr = await context.UserAccounts.Where(x => x.Guid == id)
            .FirstOrDefaultAsync() ?? throw new Exception("The user doesn't exist");
        
        var usrGenres = await context.UserGenres.Where(x => x.UserId == usr.Id).ToListAsync();

        return usrGenres.Select(x => x.ToDTO()).ToList();
    }
}
