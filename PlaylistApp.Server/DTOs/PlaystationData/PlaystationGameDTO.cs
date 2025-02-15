﻿using Org.BouncyCastle.Bcpg.OpenPgp;
using PsnApiWrapperNet.Model;

namespace PlaylistApp.Server.DTOs.PlaystationData;

public class PlaystationGameDTO
{
    public DateTime FirstPlayedDateTime { get; set; }
    public DateTime LastPlayedDateTime { get; set; }
    public int PlayCount { get; set; }
    public int PlayDuration { get; set; }
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? ImageUrl { get; set; }
    public string? Category { get; set; }
}
