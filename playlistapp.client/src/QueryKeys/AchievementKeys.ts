const AchievementKeys = {
  GetAchievementByGame: (achievementId: number) =>
    ["Achievement", "AchievementByPlatformGame", achievementId] as const,
  GetAchievementById: ["Achievement", "AchievementById"] as const,
  GetAchievementByName: ["Achievement", "AchievementByName"] as const,
};

export default AchievementKeys;
