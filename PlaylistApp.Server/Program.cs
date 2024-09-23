using IGDB;
using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.Services.Game;
using PlaylistApp.Server.Services.IGDBServices;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContextFactory<PlaylistDbContext>(config => config.UseNpgsql(builder.Configuration["ppdb"]));

builder.Services.AddSingleton<IGameService, GameService>();
builder.Services.AddSingleton< IGDBGameService>();
builder.Services.AddSingleton<IGDBGenreService>();
builder.Services.AddSingleton<IGDBCompanyService>();




var igdb_client_id = builder.Configuration["Client-ID"];
var igdb_client_secret = builder.Configuration["Client-Secret"];

builder.Services.AddSingleton(new IGDBClient(igdb_client_id, igdb_client_secret));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        policy =>
        {
            policy.WithOrigins("https://localhost:5174")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin2",
        policy =>
        {
            policy.WithOrigins("https://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

app.UseCors("AllowSpecificOrigin");
app.UseCors("AllowSpecificOrigin2");

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
