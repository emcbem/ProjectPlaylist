using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using PlaylistApp.Server.Data.Enums;
using PlaylistApp.Server.Requests.GetRequests;
using PlaylistApp.Server.Services.Game;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlaylistApp.Test.Services;

public class GameServiceTests : IClassFixture<ProjectPlaylistFactory>
{
	public ProjectPlaylistFactory projectPlaylistFactory { get; set; }
	public GameServiceTests(ProjectPlaylistFactory projectPlaylistFactory)
	{
		projectPlaylistFactory.CreateDefaultClient();
		this.projectPlaylistFactory = projectPlaylistFactory;
	}

	[Fact]
	public async Task GetAllGamesSuccessfulTest()
	{
		using var scope = projectPlaylistFactory.Services.CreateScope();
		IGameService gameService = scope.ServiceProvider.GetRequiredService<IGameService>();

		var games = await gameService.GetAllGames();

		games.Count().Should().Be(500);
	}

	[Fact]
	public async Task GetFilteredGameWithEmptyRequestGetsFirst25GamesInDatabase()
	{
		using var scope = projectPlaylistFactory.Services.CreateScope();
		IGameService gameService = scope.ServiceProvider.GetRequiredService<IGameService>();

		var games = await gameService.GetGamesByFilter(new GetGamesRequest());

		games.Count().Should().Be(25);
		games[0].Title.Should().Be("Paper Mario");
	}

	[Fact]
	public async Task AssertThat_GetGamesByFilterWithCustomTitle_Should_returnGamesWithOnlyThatTitle()
	{
		using var scope = projectPlaylistFactory.Services.CreateScope();
		IGameService gameService = scope.ServiceProvider.GetRequiredService<IGameService>();

		var request = new GetGamesRequest()
		{
			Title = "mario"
		};

		var games = await gameService.GetGamesByFilter(request);

		games.Count().Should().Be(11);
		games[0].Title.Should().Be("Paper Mario");
	}

	[Fact]
	public async Task AssertThat_GetGamesByFilterWithCustomGenres_Should_returnGamesWithThatGenre()
	{
		using var scope = projectPlaylistFactory.Services.CreateScope();
		IGameService gameService = scope.ServiceProvider.GetRequiredService<IGameService>();

		var request = new GetGamesRequest()
		{
			GenreIds = [2]
		};

		var games = await gameService.GetGamesByFilter(request);

		games.Count().Should().Be(1);
		games[0].Title.Should().Be("Shelter 2: Complete Edition");
	}

	[Fact]
	public async Task AssertThat_GetGamesByFilterWithCustomPlatforms_Should_returnGamesWithThatPlatform()
	{
		using var scope = projectPlaylistFactory.Services.CreateScope();
		IGameService gameService = scope.ServiceProvider.GetRequiredService<IGameService>();

		var request = new GetGamesRequest()
		{
			PlatformIds = [1]
		};

		var games = await gameService.GetGamesByFilter(request);

		games.Count().Should().Be(1);
		games[0].Title.Should().Be("Psych: The Game");
	}

	[Fact]
	public async Task AssertThat_GetGamesByFilterWithCustomCompanyIds_Should_returnGamesWithThatCompany()
	{
		using var scope = projectPlaylistFactory.Services.CreateScope();
		IGameService gameService = scope.ServiceProvider.GetRequiredService<IGameService>();

		var request = new GetGamesRequest()
		{
			CompanyIds = [297],
		};

		var games = await gameService.GetGamesByFilter(request);

		games.Count().Should().Be(1);
		games[0].Title.Should().Be("Psych: The Game");
	}

	[Fact]
	public async Task AssertThat_GetGamesByFilterWithCustomAZOrderingMethod_Should_returnGamesInThatOrder()
	{
		using var scope = projectPlaylistFactory.Services.CreateScope();
		IGameService gameService = scope.ServiceProvider.GetRequiredService<IGameService>();

		var request = new GetGamesRequest()
		{
			Title = "Mario",
			OrderingMethod = OrderingMethod.AZ
		};

		var games = await gameService.GetGamesByFilter(request);

		games.Count().Should().Be(11);
		games[0].Title.Should().Be("A Mario Adventure");
	}

	[Fact]
	public async Task AssertThat_GetGamesByFilterWithCustomZAOrderingMethod_Should_returnGamesInThatOrder()
	{
		using var scope = projectPlaylistFactory.Services.CreateScope();
		IGameService gameService = scope.ServiceProvider.GetRequiredService<IGameService>();

		var request = new GetGamesRequest()
		{
			Title = "Mario",
			OrderingMethod = OrderingMethod.ZA
		};

		var games = await gameService.GetGamesByFilter(request);

		games.Count().Should().Be(11);
		games[0].Title.Should().Be("Yoshi's Island: Super Mario Advance 3");
	}

	[Fact]
	public async Task AssertThat_GetGamesByFilterWithCustomRatingRankOrderingMethod_Should_returnGamesInThatOrder()
	{
		using var scope = projectPlaylistFactory.Services.CreateScope();
		IGameService gameService = scope.ServiceProvider.GetRequiredService<IGameService>();

		var request = new GetGamesRequest()
		{
			Title = "Mario",
			OrderingMethod = OrderingMethod.HighestRating
		};

		var games = await gameService.GetGamesByFilter(request);

		games.Count().Should().Be(11);
		games[0].Title.Should().Be("Paper Mario");
	}

	[Fact]
	public async Task AssertThat_GetGamesByFilterWithCustomDateMadeOrderingMethod_Should_returnGamesInThatOrder()
	{
		using var scope = projectPlaylistFactory.Services.CreateScope();
		IGameService gameService = scope.ServiceProvider.GetRequiredService<IGameService>();

		var request = new GetGamesRequest()
		{
			Title = "Mario",
			OrderingMethod = OrderingMethod.ReleaseDate
		};

		var games = await gameService.GetGamesByFilter(request);

		games.Count().Should().Be(11);
		games[0].Title.Should().Be("Super Mario Bros.");
	}

	[Fact]
	public async Task AssertThat_GetGamesByFilterWithMostPlayedOrderingMethod_Should_returnGamesInThatOrder()
	{
		using var scope = projectPlaylistFactory.Services.CreateScope();
		IGameService gameService = scope.ServiceProvider.GetRequiredService<IGameService>();

		var request = new GetGamesRequest()
		{
			Title = "",
			OrderingMethod = OrderingMethod.MostPlayed
		};

		var games = await gameService.GetGamesByFilter(request);

		games.Count().Should().Be(25);
		games[0].Title.Should().Be("Psych: The Game");
	}

}
