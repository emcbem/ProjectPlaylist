using PlaylistApp.Server.DTOs;

namespace PlaylistApp.Server.Services.PlatformServices;

public interface IPlatformService
{
    public Task<List<PlatformDTO>> GetAllPlatforms();
    public Task<PlatformDTO> GetPlatformById(int id);
    public Task<List<PlatformDTO>> GetPlatformsByName(string name); 
}
