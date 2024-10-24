using IGDB;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.Services.Achievement;
using PlaylistApp.Server.Services.CompanyServices;
using PlaylistApp.Server.Services.FriendServices;
using PlaylistApp.Server.Services.Game;
using PlaylistApp.Server.Services.GameReviewService;
using PlaylistApp.Server.Services.GenreServices;
using PlaylistApp.Server.Services.GoalLikeServices;
using PlaylistApp.Server.Services.GoalServices;
using PlaylistApp.Server.Services.IGDBServices;
using PlaylistApp.Server.Services.ImageServices;
using PlaylistApp.Server.Services.ListServices;
using PlaylistApp.Server.Services.PlatformGameServices;
using PlaylistApp.Server.Services.PlatformServices;
using PlaylistApp.Server.Services.ReviewLikeServices;
using PlaylistApp.Server.Services.SyncServices;
using PlaylistApp.Server.Services.UserAchievementLikeServices;
using PlaylistApp.Server.Services.UserAchievementServices;
using PlaylistApp.Server.Services.UserGameServices;
using PlaylistApp.Server.Services.UserGenreService;
using PlaylistApp.Server.Services.UserPlatformServices;
using PlaylistApp.Server.Services.UserServices;

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

builder.Services.AddSingleton<IAchievementService, AchievementService>();
builder.Services.AddSingleton<ICompanyService, CompanyService>();
builder.Services.AddSingleton<IFriendService, FriendService>();
builder.Services.AddSingleton<IGameReviewService, GameReviewService>();
builder.Services.AddSingleton<IGameService, GameService>();
builder.Services.AddSingleton<IGenreService, GenreService>();
builder.Services.AddSingleton<IGoalLikeService, GoalLikeService>();
builder.Services.AddSingleton<IGoalService, GoalService>();
builder.Services.AddSingleton<IImageService, ImageService>();
builder.Services.AddSingleton<IListService, ListService>();
builder.Services.AddSingleton<IPlatformGameService, PlatformGameService>();
builder.Services.AddSingleton<IPlatformService, PlatformService>();
builder.Services.AddSingleton<IReviewLikeService, ReviewLikeService>();
builder.Services.AddSingleton<IUserAchievementLikeService, UserAchievementLikeService>();
builder.Services.AddSingleton<IUserAchievementService, UserAchievementService>();
builder.Services.AddSingleton<IUserGameService, UserGameService>();
builder.Services.AddSingleton<IUserGenreService, UserGenreService>();
builder.Services.AddSingleton<IUserPlatformService, UserPlatformService>();
builder.Services.AddSingleton<IUserService, UserService>();
builder.Services.AddSingleton<SyncService>();


builder.Services.AddSingleton<DownloadCsv>();
builder.Services.AddSingleton<UploadData>();






var igdb_client_id = builder.Configuration.GetValue<string>("Client-ID", "");
var igdb_client_secret = builder.Configuration.GetValue<string>("Client-Secret", "");

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




var app = builder.Build();

app.UseCors("AllowSpecificOrigin");

app.UseDefaultFiles();
app.UseStaticFiles();

var forwardOptions = new ForwardedHeadersOptions
    {
        ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
    };
forwardOptions.KnownNetworks.Clear(); // Clears known networks to avoid network restrictions
forwardOptions.KnownProxies.Clear();  // Clears known proxies
    
app.UseForwardedHeaders(forwardOptions);

// Configure the HTTP request pipeline.

    app.UseSwagger();
    app.UseSwaggerUI();



app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
