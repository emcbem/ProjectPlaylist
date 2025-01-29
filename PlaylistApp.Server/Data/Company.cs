using System;
using System.Collections.Generic;
using PlaylistApp.Server.Interfaces;

namespace PlaylistApp.Server.Data;

public partial class Company : IChecksum
{
    public int Id { get; set; }

    public string CompanyName { get; set; } = null!;

    public string? Description { get; set; }

    public string? LogoUrl { get; set; }

    public DateTime? StartDate { get; set; }

    public string? Checksum { get; set; }

    public string? Slug { get; set; }

    public int? IgdbId { get; set; }

    public virtual ICollection<InvolvedCompany> InvolvedCompanies { get; set; } = new List<InvolvedCompany>();
}
