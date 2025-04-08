﻿using Microsoft.EntityFrameworkCore;
using MimeKit.Cryptography;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.DTOs.WrapUpData;
using PlaylistApp.Server.Requests.GetRequests;
using PlaylistApp.Server.Services.Game;
using PlaylistApp.Server.Services.PlatformGameServices;
using PlaylistApp.Server.Services.UserGameAuditLogServices;
using PlaylistApp.Server.Services.UserGameServices;
using System.Globalization;

namespace PlaylistApp.Server.Services.WrapUpServices;

public class WrapUpService : IWrapUpService
{
    private readonly IDbContextFactory<PlaylistDbContext> dbContextFactory;
    private readonly IUserGameAuditLogService userGameAuditLogService;
    private readonly IGameService gameService;
    private readonly IPlatformGameService platformGameService;
    private readonly IUserGameService userGameService;
    public WrapUpService(IDbContextFactory<PlaylistDbContext> dbContextFactory, IUserGameAuditLogService userGameAuditLogService, IGameService gameService, IPlatformGameService platformGameService, IUserGameService userGameService)
    {
        this.dbContextFactory = dbContextFactory;
        this.userGameAuditLogService = userGameAuditLogService;
        this.gameService = gameService;
        this.platformGameService = platformGameService;
        this.userGameService = userGameService;
    }
    public async Task<List<WrapUpCarouselGameDTO>> ConvertUserGameAuditLogsToCarouselGame(GetWrapUpRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.UserId) || !Guid.TryParse(request.UserId, out var userGuid))
        {
            return new List<WrapUpCarouselGameDTO>();
        }

        var context = await dbContextFactory.CreateDbContextAsync();

        var getUserGameAuditLogsRequest = new GetAuditLogByDateRequest
        {
            UserGuid = userGuid,
            Month = request.Month,
            Year = request.Year
        };

        var games = await userGameAuditLogService.GetUserGamesFromUserGameAuditLogDate(getUserGameAuditLogsRequest);

        if (games == null || !games.Any())
        {
            return new List<WrapUpCarouselGameDTO>();
        }

        return GatherCarouselGames(games);
    }

    public async Task<List<WrapUpHourBarGraphDTO>> GatherBarGraphData(GetWrapUpRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.UserId) || !Guid.TryParse(request.UserId, out var userGuid))
        {
            return new List<WrapUpHourBarGraphDTO>();
        }

        var context = await dbContextFactory.CreateDbContextAsync();

        var auditLogRequest = new GetAuditLogByDateRequest
        {
            Month = request.Month,
            Year = request.Year,
            UserGuid = userGuid
        };

        var allUserGameAuditLogs = await userGameAuditLogService.GetAllUserGameAuditLogsByDate(auditLogRequest);

        var platformGameIdToAuditData = new Dictionary<int, (long? MinutesBefore, long? MinutesAfter)>();

        foreach (var auditLog in allUserGameAuditLogs)
        {
            if (!platformGameIdToAuditData.ContainsKey(auditLog.PlatformGameId))
            {
                platformGameIdToAuditData[auditLog.PlatformGameId] = (auditLog.MinutesBefore, auditLog.MinutesAfter);
            }
            else
            {
                var (firstMinutesBefore, _) = platformGameIdToAuditData[auditLog.PlatformGameId];
                platformGameIdToAuditData[auditLog.PlatformGameId] = (firstMinutesBefore, auditLog.MinutesAfter);
            }
        }

        var wrapUpHourBarGraphDTOs = new List<WrapUpHourBarGraphDTO>();

        foreach (var kvp in platformGameIdToAuditData)
        {
            var platformGameId = kvp.Key;
            var (minutesBefore, minutesAfter) = kvp.Value;
            var currentGame = await platformGameService.GetPlatformGameById(platformGameId);

            var minutesChange = (minutesAfter ?? 0) - (minutesBefore ?? 0);

            wrapUpHourBarGraphDTOs.Add(new WrapUpHourBarGraphDTO
            {
                GameTitle = currentGame.Game.Title,
                TimePlayed = minutesChange,
                PlatformGameId = kvp.Key
            });
        }

        return wrapUpHourBarGraphDTOs;
    }

    public async Task<GraphDTO> GatherHourGraphData(GetWrapUpRequest request, List<WrapUpHourBarGraphDTO> barGraphDTOs)
    {
        if (string.IsNullOrWhiteSpace(request.UserId) || !Guid.TryParse(request.UserId, out var userGuid))
        {
            return new GraphDTO();
        }

        var getUserGameAuditLogsRequest = new GetAuditLogByDateRequest
        {
            UserGuid = userGuid,
            Month = request.Month,
            Year = request.Year
        };

        var allUserGameAuditLogs = await userGameAuditLogService.GetAllUserGameAuditLogsByDate(getUserGameAuditLogsRequest);

        if (allUserGameAuditLogs.Count <= 0)
        {
            return new GraphDTO();
        }

        var maxMinutes = barGraphDTOs.Max(x => x.TimePlayed) / 60;
        var numberOfXTicks = 12;
        string month = "";

        if (request.Month != -1)
        {
            numberOfXTicks = DateTime.DaysInMonth(request.Year, request.Month);
            month = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(request.Month);
        }

        double[] minutesPerTick = new double[numberOfXTicks];
        List<HourGraphDataPoint> dataPoints = [];

        if (request.Month != -1)
        {
            foreach (var auditLog in allUserGameAuditLogs)
            {
                var currentDay = auditLog.AuditDate.Day;
                var currentGame = barGraphDTOs.Where(x => x.PlatformGameId == auditLog.PlatformGameId).FirstOrDefault();

                if (currentGame is not null)
                {
                    minutesPerTick[currentDay - 1] += currentGame.TimePlayed;
                }
            }
        }
        else
        {
            foreach (var auditLog in allUserGameAuditLogs)
            {
                var currentMonth = auditLog.AuditDate.Month;
                var currentGame = barGraphDTOs.Where(x => x.PlatformGameId == auditLog.PlatformGameId).FirstOrDefault();

                if (currentGame is not null)
                {
                    minutesPerTick[currentMonth - 1] += currentGame.TimePlayed;
                }
            }
        }

        for (int i = 0; i < minutesPerTick.Length; i++)
        {
            var newDataPoint = new HourGraphDataPoint
            {
                DateNumber = i + 1,
                Minutes = minutesPerTick[i]
            };

            dataPoints.Add(newDataPoint);
        }

        if (request.Month == -1)
        {

            var newGraphDTO = new GraphDTO
            {
                Title = $"{request.Year} Hours",
                X_Axis = "Months",
                Y_Axis = "Hours",
                GraphDataPoints = dataPoints
            };

            return newGraphDTO;
        }
        else
        {

            var newGraphDTO = new GraphDTO
            {
                Title = $"{month}, {request.Year} Hours",
                X_Axis = "Days",
                Y_Axis = "Hours",
                GraphDataPoints = dataPoints
            };

            return newGraphDTO;
        }
    }

    public async Task<TopGameDTO> GatherTopGameData(GetWrapUpRequest request, List<WrapUpHourBarGraphDTO> bar)
    {
        if (request is null)
        {
            return new TopGameDTO();
        }

        var topHoursGame = bar.OrderByDescending(x => x.TimePlayed).FirstOrDefault();

        if (topHoursGame is null)
        {
            return new TopGameDTO();
        }

        var topGame = await platformGameService.GetPlatformGameById(topHoursGame.PlatformGameId);


        var getUserGameRequest = new GetUserGameRequest
        {
            PlatformGameId = topGame.id,
            UserId = new Guid(request.UserId)
        };

        var topGameHours = await userGameService.GetUserGameByPlatformGameAndUser(getUserGameRequest);

        if (topGame.Game is null || topGame.Game.CoverUrl is null || topGameHours is null || topGameHours.TimePlayed is null || topGame.Achievements is null)
        {
            return new TopGameDTO();
        }

        var newTopGameDTO = new TopGameDTO
        {
           CoverUrl = topGame.Game.CoverUrl,
           AllTimeHours = (double)topGameHours.TimePlayed,
           FirstTimePlayed = topGameHours.DateAdded,
           PlatformId = topGame.Platform.Id,
           Title = topGame.Game.Title,
           TotalAchievements = topGame.Achievements.Count
        };

        return newTopGameDTO;
    }

    public async Task<WrapUpDTO> OrchestrateWrapUpGathering(GetWrapUpRequest request)
    {
        if (request is null)
        {
            return new WrapUpDTO();
        }

        var carouselGames = await ConvertUserGameAuditLogsToCarouselGame(request);
        var hourBarGraphDTOs = await GatherBarGraphData(request);
        var graphDTO = await GatherHourGraphData(request, hourBarGraphDTOs);
        var topGameDTO = await GatherTopGameData(request, hourBarGraphDTOs);

        var newWrapUpDTO = new WrapUpDTO()
        {
            GamesPlayed = carouselGames,
            BarGraphGameData = hourBarGraphDTOs,
            HourGraph = graphDTO,
            TopGame = topGameDTO
        };

        return newWrapUpDTO;
    }

    private List<WrapUpCarouselGameDTO> GatherCarouselGames(List<GameDTO> games)
    {
        var carouselGames = new List<WrapUpCarouselGameDTO>();

        foreach (var game in games)
        {
            var carouselGame = new WrapUpCarouselGameDTO
            {
                CoverURL = game.CoverUrl ?? "",
                GameName = game.Title
            };

            carouselGames.Add(carouselGame);
        }

        return carouselGames;
    }
}
