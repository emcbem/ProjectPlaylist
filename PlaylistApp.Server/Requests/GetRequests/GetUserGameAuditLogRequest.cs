﻿namespace PlaylistApp.Server.Requests.GetRequests;

public class GetUserGameAuditLogRequest
{
    public int Month { get; set; } = -1;
    public int Year { get; set; } = DateTime.Now.Year;
    public Guid UserGuid { get; set; }
}
