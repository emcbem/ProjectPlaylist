using System.Text.Json.Serialization;

namespace PlaylistApp.Server.DTOs.SteamData;

public class SteamRawGame
{
	[JsonPropertyName("appid")]
	public int AppId { get; set; }


	[JsonPropertyName("playtime_forever")]
	public int PlaytimeForever { get; set; }


	[JsonPropertyName("playtime_windows_forever")]
	public int PlaytimeWindowsForever { get; set; }


	[JsonPropertyName("playtime_mac_forever")]
	public int PlaytimeMacForever { get; set; }


	[JsonPropertyName("playtime_linux_forever")]
	public int PlaytimeLinuxeForever { get; set; }


	[JsonPropertyName("playtime_deck_forever")]
	public int PlaytimeDeckForever { get; set; }


	[JsonPropertyName("rtime_last_played")]
	public long RtimeLastPlayed { get; set; }


	[JsonPropertyName("playtime_disconnected")]
	public int PlaytimeDisconnected { get; set; }
}
