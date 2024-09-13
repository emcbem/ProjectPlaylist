using System;
using System.Collections.Generic;

namespace PlaylistApp.Server.Data;

public partial class Friend
{
    public int Id { get; set; }

    public int BaseId { get; set; }

    public int RecievedId { get; set; }

    public bool IsAccepted { get; set; }

    public DateTime AcceptedDate { get; set; }

    public virtual UserAccount Base { get; set; } = null!;

    public virtual UserAccount Recieved { get; set; } = null!;
}
