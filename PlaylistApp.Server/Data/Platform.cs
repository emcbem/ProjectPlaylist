using System;
using System.Collections.Generic;
using PlaylistApp.Server.Interfaces;

namespace PlaylistApp.Server.Data;

public partial class Platform : IChecksum
{
    public int Id { get; set; }

    public string LogoUrl { get; set; } = null!;

    public string PlatformName { get; set; } = null!;

    public string? Checksum { get; set; }

    public virtual ICollection<PlatformGame> PlatformGames { get; set; } = new List<PlatformGame>();

    public virtual ICollection<UserPlatform> UserPlatforms { get; set; } = new List<UserPlatform>();
}
