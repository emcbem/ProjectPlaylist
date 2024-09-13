using System;
using System.Collections.Generic;

namespace PlaylistApp.Server.Data;

public partial class List
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string ListName { get; set; } = null!;

    public bool IsPublic { get; set; }

    public DateTime DateMade { get; set; }

    public virtual ICollection<ListGame> ListGames { get; set; } = new List<ListGame>();

    public virtual UserAccount User { get; set; } = null!;
}
