using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using PlaylistApp.Server.Data;
using Testcontainers.PostgreSql;

public class ProjectPlaylistFactory : WebApplicationFactory<Program>, IAsyncLifetime
{
	private readonly PostgreSqlContainer _dbContainer;
	public ProjectPlaylistFactory()
	{
		var backupFile = Directory.GetFiles("../../../../", "pg-init.sql", SearchOption.AllDirectories)
			.Select(f => new FileInfo(f))
			.OrderByDescending(fi => fi.LastWriteTime)
			.First();

		_dbContainer = new PostgreSqlBuilder()
			.WithImage("postgres")
			.WithPassword("Strong_password_123!")
			.WithBindMount(backupFile.FullName, "/docker-entrypoint-initdb.d/init.sql")
			.Build();
	}

	protected override void ConfigureWebHost(IWebHostBuilder builder)
	{
		var connection = _dbContainer.GetConnectionString();
		builder.ConfigureTestServices(services =>
		{
			services.RemoveAll(typeof(DbContextOptions<PlaylistDbContext>));
			services.AddDbContextFactory<PlaylistDbContext>(options => options.UseNpgsql(_dbContainer.GetConnectionString()));
		});
	}

	public async Task InitializeAsync()
	{
		await _dbContainer.StartAsync();
	}

	public new async Task DisposeAsync()
	{
		await _dbContainer.StopAsync();
	}
}