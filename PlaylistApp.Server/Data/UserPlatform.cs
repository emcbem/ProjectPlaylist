using System;
using System.Collections.Generic;

namespace PlaylistApp.Server.Data;

public partial class UserPlatform
{
    public int Id { get; set; }

    public int PlatformId { get; set; }

    public int UserId { get; set; }

    public string Gamertag { get; set; } = null!;

    public bool IsPublic { get; set; }

    public string ExternalPlatformId { get; set; } = null!;

    public virtual Platform Platform { get; set; } = null!;

    public virtual UserAccount User { get; set; } = null!;
}
