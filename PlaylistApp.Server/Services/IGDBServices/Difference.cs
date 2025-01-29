using PlaylistApp.Server.Interfaces;

namespace PlaylistApp.Server.Services.IGDBServices;



public class Difference
{
    public static DifferencesToCheck FindItemsThatNeedAttention(List<IChecksum> personalDatabase, HashSet<(string, string)> igdbChecksums)
    {

    }
}

public class DifferencesToCheck
{
    public List<IChecksum>? ChecksumsThatChanged { get; set; }
    public List<IChecksum>? Missing { get; set; }
}

