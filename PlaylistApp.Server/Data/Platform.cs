using System;
using System.Collections.Generic;

namespace PlaylistApp.Server.Data;

public partial class Platform
{
    public int Id { get; set; }

    public string LogoUrl { get; set; } = null!;

    public string PlatformName { get; set; } = null!;

    public int? Checksum { get; set; }

    public virtual ICollection<PlatformGame> PlatformGames { get; set; } = new List<PlatformGame>();

    public virtual ICollection<UserPlatform> UserPlatforms { get; set; } = new List<UserPlatform>();
}
