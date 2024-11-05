namespace PlaylistApp.Server.Services.IGDBServices;

public static class Strainer
{
	public static HashSet<int> FlaggedPlatforms = new HashSet<int>()
		{
			13, 15, 16, 25, 27, 30, 34, 35, 39, 42, 44, 47, 50,
			51, 52, 53, 55, 57, 59, 60, 61, 62, 63, 64, 65, 66,
			67, 68, 69, 70, 71, 72, 73, 74, 75, 77, 78, 79, 80,
			82, 84, 85, 86, 88, 89, 90, 91, 93, 94, 95, 96, 97,
			98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108,
			109, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120,
			121, 122, 123, 124, 125, 126, 127, 128, 129, 131, 132,
			133, 134, 135, 136, 138, 139, 140, 141, 142, 143, 144,
			145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155,
			156, 157, 158, 161, 164, 166, 170, 203, 236, 237, 238,
			239, 240, 274, 306, 307, 308, 309, 339, 372, 373, 374,
			375, 376, 377, 378, 379, 380, 381, 382, 384, 385, 386,
			387, 388, 389, 405, 406, 407, 408, 409, 410, 411, 412,
			413, 414, 415, 416, 417, 440, 441, 471, 472, 473, 474,
			475, 476, 477, 478, 479, 480, 481, 482, 486, 487, 504,
			505
		};

	public static HashSet<int?> FlaggedKeywords = new HashSet<int?>()
		{
			2509
		};

	public static HashSet<int> FlaggedThemes = new HashSet<int>()
		{
			42
		};

	public static List<IGDB.Models.Game> StrainGames(List<IGDB.Models.Game> games)
	{
		var uselessGames = games.Where(p =>
		{
			bool keywordFlagged = p.Keywords?.Ids.Any(id => FlaggedKeywords.Contains((int?)id)) ?? false;
			bool platformFlagged = p.Platforms.Ids.Count() == 0 || p.Platforms.Ids.All(id => FlaggedPlatforms.Contains((int)id));
			bool coverFlagged = p.Cover.Id == -1;
			bool themeFlagged = p.Themes?.Ids.Any(id => FlaggedThemes.Contains((int)id)) ?? false;
			bool flaggedAsDlc = p.Category != IGDB.Models.Category.MainGame;

			return keywordFlagged || platformFlagged || coverFlagged || themeFlagged || flaggedAsDlc;
		}).ToList();

		return uselessGames;
	}
}
