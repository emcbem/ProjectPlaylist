using IGDB;
using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.Services;
using PlaylistApp.Server.Services.GameReviewService;
using PlaylistApp.Server.Services.IGDBServices;
using PlaylistApp.Server.Services.IGDBSyncServices.Downloader;
using PlaylistApp.Server.Services.SyncServices;
using Microsoft.IdentityModel.Tokens;
using PlaylistApp.Server.Services.UserGenreService;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.CustomSchemaIds(type => type.FullName.Replace(".", "_"));
});
builder.Services.AddHttpClient();
builder.Services.AddDbContextFactory<PlaylistDbContext>(config => config.UseNpgsql(builder.Configuration.GetConnectionString("ppdb"), builder =>
{
    builder.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null);
}));

builder.Services.AddControllers().AddJsonOptions(x =>
{
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    x.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});

builder.MapProjectPlaylistCoreServices();
builder.MapIGDBSyncingServices();
builder.MapPlaystationServices();

//These ones don't want to be in the mapper for some reason.
builder.Services.AddSingleton<IUserGenreService, UserGenreService>();
builder.Services.AddSingleton<IGameReviewService, GameReviewService>();

builder.Services.AddSingleton<SyncService>();
builder.Services.AddSingleton<CsvDownloader>();
builder.Services.AddSingleton<UploadData>();

var igdb_client_id = builder.Configuration.GetValue<string>("Client_ID", "");
var igdb_client_secret = builder.Configuration.GetValue<string>("Client_Secret", "");

builder.Services.AddSingleton(new IGDBClient(igdb_client_id, igdb_client_secret));

bool allowAll = builder.Configuration["allowAll"] == "true";

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        policy =>
        {
            if (allowAll)
            {
                policy.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
            }
            else
            {
                policy.WithOrigins("https://localhost:5174")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
            }
        });
});

builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidIssuer = "https://dev-hto6puiswhque3fr.us.auth0.com",
            ValidAudience = "https://dev-hto6puiswhque3fr.us.auth0.com/api/v2/"
        };
        options.Authority = "https://dev-hto6puiswhque3fr.us.auth0.com";
    });

var app = builder.Build();

app.UseCors("AllowSpecificOrigin");


app.UseDefaultFiles();
app.UseStaticFiles();

app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();

public partial class Program { }