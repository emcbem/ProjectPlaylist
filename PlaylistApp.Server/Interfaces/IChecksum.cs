namespace PlaylistApp.Server.Interfaces
{
    public interface IChecksum
    {
        public string? Checksum { get; set; }
        public int? IgdbId { get; set; }
    }
}
