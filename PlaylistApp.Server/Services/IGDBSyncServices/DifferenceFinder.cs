using PlaylistApp.Server.Interfaces;
using System.Linq;

namespace PlaylistApp.Server.Services.IGDBServices;



public static class DifferenceFinder
{
    public static DifferencesToCheck FindItemsThatNeedAttention(List<IChecksum> personalDatabase, Dictionary<int, string> igdbChecksums)
    {
        var difference = new DifferencesToCheck();

        var ids = personalDatabase.Select(x => x?.IgdbId ?? 0).ToHashSet();
        var igdbIds = igdbChecksums.Keys.ToHashSet();
        difference.IgdbIdsNeededToBeAdded = igdbIds.Except(ids).ToHashSet();
        

        difference.PersonalItemsThatAreNoLongerInIgdb = new HashSet<IChecksum>();
        difference.ChecksumsThatChanged = new HashSet<IChecksum>();

        personalDatabase.ForEach(personal =>
        {
            if (igdbChecksums.ContainsKey(personal.IgdbId ?? 0))
            {
                if (igdbChecksums[personal.IgdbId ?? 0] != personal.Checksum)
                {
                    difference.ChecksumsThatChanged.Add(personal);
                }
            }
            else
            {
                difference.PersonalItemsThatAreNoLongerInIgdb.Add(personal); 
            }
        });

        return difference;
    }
}

public class DifferencesToCheck
{
    public HashSet<IChecksum>? ChecksumsThatChanged { get; set; }
    public HashSet<IChecksum>? PersonalItemsThatAreNoLongerInIgdb { get; set; }
    public HashSet<int>? IgdbIdsNeededToBeAdded { get; set; }
}

