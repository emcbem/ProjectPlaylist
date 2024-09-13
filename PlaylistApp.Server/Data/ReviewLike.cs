using System;
using System.Collections.Generic;

namespace PlaylistApp.Server.Data;

public partial class ReviewLike
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int GameReviewId { get; set; }

    public bool? IsLike { get; set; }

    public DateTime? DateLiked { get; set; }

    public virtual GameReview GameReview { get; set; } = null!;

    public virtual UserAccount User { get; set; } = null!;
}
