using PlaylistApp.Server.Data;

namespace PlaylistApp.Server.DTOs;

public static class DTOConverter
{
    public static GameDTO ToDTO(this Game game)
    {
        return new GameDTO()
        {
            Id = game.Id,
            Title = game.Title,
            PublishDate = game.PublishDate,
            AgeRating
            = game.AgeRating,
            CoverUrl
            = game.CoverUrl,
            Description = game.Description,
            IdgbId = game.IdgbId,

            //TODO: Calculate hours plays
            //TODO: Calculate total total owned
            
        };
    }
}
