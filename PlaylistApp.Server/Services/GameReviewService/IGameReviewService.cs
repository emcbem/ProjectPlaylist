using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;

namespace PlaylistApp.Server.Services.GameReviewService;

public interface IGameReviewService
{
    public Task<List<GameReviewDTO>> GetAllGameReivewByGame(int GameId);
    public Task<GameReviewDTO> GetGameReviewById(int GameReviewId);
    public Task<int> AddGameReview(AddGameReviewRequest request);
    public Task<GameReviewDTO> UpdateGameReview(UpdateGameReviewRequest request);
    public Task<bool> DeleteGameReview(int GameReviewId);
}
