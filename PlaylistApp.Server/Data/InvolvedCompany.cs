using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PlaylistApp.Server.Data;

public partial class InvolvedCompany
{
    [Key]
    public int Id { get; set; }

    public int GameId { get; set; }

    public int CompanyId { get; set; }

    public bool? IsDeveloper { get; set; }

    public bool? IsPublisher { get; set; }

    public virtual Company Company { get; set; } = null!;

    public virtual Game Game { get; set; } = null!;
}
