using PlaylistApp.Server.DTOs;
using PlaylistApp.Server.DTOs.WrapUpData;
using PlaylistApp.Server.Requests.GetRequests;

namespace PlaylistApp.Server.Services.WrapUpServices;

public interface IWrapUpService
{
    public Task<WrapUpDTO> OrchestrateWrapUpGathering(GetWrapUpRequest request);
    public Task<List<WrapUpCarouselGameDTO>> ConvertUserGameAuditLogsToCarouselGame(GetWrapUpRequest request);
    public Task<List<WrapUpHourBarGraphDTO>> GatherBarGraphData(GetWrapUpRequest request);
}
