using System;
using System.Collections.Generic;

namespace PlaylistApp.Server.Data;

public partial class UserImage
{
    public int Id { get; set; }

    public string Url { get; set; } = null!;

    public virtual ICollection<UserAccount> UserAccounts { get; set; } = new List<UserAccount>();
}
