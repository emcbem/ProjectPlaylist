using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.GetRequests;
using System.Runtime.CompilerServices;

namespace PlaylistApp.Server.Services.Game;

internal static class GameIncluder
{
	public static IQueryable<Data.Game> IncludeGames(this DbSet<Data.Game> games)
	{
		return games
			.Include(x => x.InvolvedCompanies)
				.ThenInclude(x => x.Company)
			.Include(x => x.GameGenres)
				.ThenInclude(x => x.Genre)
			.Include(x => x.PlatformGames)
				.ThenInclude(x => x.Achievements)
			.Include(x => x.PlatformGames)
				.ThenInclude(x => x.Platform)
			.Include(x => x.GameReviews)
				.ThenInclude(x => x.ReviewLikes)
			.Include(x => x.GameReviews)
				.ThenInclude(x => x.User);
	}
}
public class GameService : IGameService
{
	private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;

	public GameService(IDbContextFactory<PlaylistDbContext> dbContextFactory)
	{
		this.dbContextFactory = dbContextFactory;
	}

	public async Task<List<GameDTO>> GetAllGames()
	{
		using var context = await dbContextFactory.CreateDbContextAsync();

		var games = await context.Games
			.Take(500)
			.ToListAsync(); // Use ToListAsync for async execution

		return games.Select(x => x.ToDTO()).ToList();
	}

	public async Task<List<GameDTO>> GetAllGamesByCompany(int companyId)
	{
		using var context = await dbContextFactory.CreateDbContextAsync();

		var games = await context.Games
			.IncludeGames()
			.ToListAsync();

		if (!games.Any())
		{
			return new List<GameDTO>();
		}

		return games.Select(x => x.ToDTO()).ToList();
	}

	public async Task<GameDTO> GetGameByID(int id)
	{
		using var context = await dbContextFactory.CreateDbContextAsync();

		var game = await context.Games
			.IncludeGames()
			.Where(x => x.Id == id)
			.FirstOrDefaultAsync();

		if (game == null)
		{
			return new GameDTO();
		}

		return game.ToDTO();
	}

	public async Task<GameDTO> GetGameByIGDB(int id)
	{
		using var context = await dbContextFactory.CreateDbContextAsync();

		var game = await context.Games
			.IncludeGames()
			.Where(x => x.IdgbId == id)
			.FirstOrDefaultAsync();

		if (game == null)
		{
			return new GameDTO();
		}

		return game.ToDTO();
	}

	public async Task<List<GameDTO>> GetGameByName(string name)
	{
		using var context = await dbContextFactory.CreateDbContextAsync();

		var games = await context.Games
			.IncludeGames()
			.Where(x => x.Title.ToLower().Contains(name.ToLower()))
			.ToListAsync();

		return games.Select(x => x.ToDTO()).ToList();
	}

	public async Task<List<GameDTO>> GetGamesByFilter(GetGamesRequest request)
	{
		using var context = await dbContextFactory.CreateDbContextAsync();

		var query = context.Games
			.Include(x => x.PlatformGames)
				.ThenInclude(x => x.UserGames)
			.Include(x => x.InvolvedCompanies)
			.Include(x => x.GameReviews)
			.Include(x => x.GameGenres)
			.Where(x => x.Title.ToLower().Contains(request.Title.ToLower()));

		if (request.PlatformIds is not null && request.PlatformIds.Any())
		{
			query = query.Where(x => request.PlatformIds.All(platformId => x.PlatformGames.Any(y => y.PlatformId == platformId)));
		}

		if (request.CompanyIds is not null && request.CompanyIds.Any())
		{
			query = query.Where(x => request.CompanyIds.All(companyId => x.InvolvedCompanies.Any(y => y.CompanyId == companyId)));
		}

		if (request.GenreIds != null && request.GenreIds.Any())
		{
			query = query.Where(x => request.GenreIds.All(genreId => x.GameGenres.Any(y => y.GenreId == genreId)));
		}

		switch (request.OrderingMethod)
		{
			case Data.Enums.OrderingMethod.HighestRating:
				query = query.OrderByDescending(game => game.GameReviews.Sum(gr => gr.Rating)).ThenBy(x => x.Id);
				break;
			case Data.Enums.OrderingMethod.ReleaseDate:
				query = query.OrderBy(game => game.PublishDate).ThenBy(x => x.Id);
				break;
			case Data.Enums.OrderingMethod.ZA:
				query = query.OrderByDescending(game => game.Title);
				break;
			default:
			case Data.Enums.OrderingMethod.AZ:
				query = query.OrderBy(game => game.Title);
				break;
		}

		var games = query
			.Skip(request.Page * request.PageSize)
			.Take(request.PageSize)
		.Select(x => x.ToDTO())
		.ToList();

		return games;

	}
}

