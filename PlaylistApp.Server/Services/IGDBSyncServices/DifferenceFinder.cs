using PlaylistApp.Server.Interfaces;
using System.Linq;

namespace PlaylistApp.Server.Services.IGDBServices;



public class DifferenceFinder
{
    public static DifferencesToCheck FindItemsThatNeedAttention(List<IChecksum> personalDatabase, Dictionary<int, string> igdbChecksums)
    {
        var difference = new DifferencesToCheck();

        var ids = personalDatabase.Select(x => x?.IgdbId ?? 0).ToList();
        var igdbIds = igdbChecksums.Keys.ToList();
        difference.IgdbIdsNeededToBeAdded = igdbIds.Except(ids).ToList();
        

        difference.PersonalItemsThatAreNoLongerInIgdb = new List<IChecksum>();
        difference.ChecksumsThatChanged = new List<IChecksum>();

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
    public List<IChecksum>? ChecksumsThatChanged { get; set; }
    public List<IChecksum>? PersonalItemsThatAreNoLongerInIgdb { get; set; }
    public List<int>? IgdbIdsNeededToBeAdded { get; set; }
}

