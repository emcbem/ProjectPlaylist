using System;
using System.Collections.Generic;

namespace PlaylistApp.Server.Data;

public partial class Notification
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public string? Title { get; set; }

    public string? Body { get; set; }

    public DateTime? DateNotified { get; set; }

    public bool? UserNotified { get; set; }

    public virtual UserAccount? User { get; set; }
}
