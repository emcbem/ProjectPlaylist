using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.GetRequests;

namespace PlaylistApp.Server.Services.Game;

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

		var games = context.Games
			.Include(x => x.InvolvedCompanies)
				.ThenInclude(x => x.Company)
			.Take(500)
			.ToList();

		return games.Select(x => x.ToDTO()).ToList();
	}

	public async Task<List<GameDTO>> GetAllGamesByCompany(int companyId)
	{
		using var context = await dbContextFactory.CreateDbContextAsync();

		var games = await context.Games
			.Where(x => x.InvolvedCompanies
				.Where(x => x.CompanyId == companyId)
				.Count() > 0)
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
			.Include(x => x.InvolvedCompanies)
				.ThenInclude(x => x.Company)
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
				query = query.OrderByDescending(game => game.GameReviews.Sum(gr => gr.Rating));
				break;
			case Data.Enums.OrderingMethod.MostPlayed:
				query = query.OrderByDescending(game => (int?)game.PlatformGames.Sum(x => x.UserGames.Sum(y => y.TimePlayed)) ?? 0);
				break;
			case Data.Enums.OrderingMethod.ReleaseDate:
				query = query.OrderBy(game => game.PublishDate);
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

