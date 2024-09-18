using PlaylistApp.Server.Data;

namespace PlaylistApp.Server.Services.ImageServices;

public interface IImageService
{
    public Task<List<UserImage>> GetImagesAsync();
}
