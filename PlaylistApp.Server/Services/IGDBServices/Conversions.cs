namespace PlaylistApp.Server.Services.IGDBServices;

public static class Conversions
{
    public static DateTime UnixTimeToDateTime(long unixTimeSeconds, bool yearOnly = false)
    {
        DateTime unixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        var date = unixEpoch.AddSeconds(unixTimeSeconds).ToUniversalTime();

        if (yearOnly)
        {
            date = new DateTime(date.Year, 1, 1).ToUniversalTime();
        }

        return date;
    }
}
