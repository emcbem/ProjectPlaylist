using Microsoft.AspNetCore.Mvc;
using PlaylistApp.Server.Data;
using PlaylistApp.Server.Services.ImageServices;

namespace PlaylistApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class ImageController : Controller
{
    private readonly IImageService imageService;

    public ImageController(IImageService imageService)
    {
        this.imageService = imageService;
    }

    [HttpGet("getuserimages")]
    public async Task<List<UserImage>> GetAllUserImages()
    {
        return await imageService.GetImagesAsync();
    }
}
