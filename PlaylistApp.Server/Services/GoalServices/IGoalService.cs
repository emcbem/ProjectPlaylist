using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.Requests.AddRequests;
using PlaylistApp.Server.Requests.UpdateRequests;

namespace PlaylistApp.Server.Services.GoalServices;

public interface IGoalService
{
    public Task<List<GoalDTO>> GetGoalsFromUser(Guid userId);
    public Task<bool> DeleteGoal(int id);
    public Task<GoalDTO> UpdateGoal(UpdateGoalRequest request);
    public Task<GoalDTO> GetGoalById(int id);
    public Task<int> AddGoal(AddGoalRequest request);
}
