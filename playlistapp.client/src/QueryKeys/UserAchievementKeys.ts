const UserAchievementKeys = {
  AddUserAchievement: ["UserAchievement", "AddUserAchievement"] as const,
  GetUserAchievementByAchievementId: [
    "UserAchievement",
    "GetUserAchievementByAchievementId",
  ] as const,
  GetUserAchievementById: [
    "UserAchievement",
    "GetUserAchievementById",
  ] as const,
  GetUserAchievementByUserId: (userId: string) =>
    ["UserAchievement", "GetUserAchievementByUserId", userId] as const,
  UpdateUserAchievement: ["UserAchievement", "UpdateUserAchievement"] as const,
  DeleteUserAchievement: ["UserAchievement", "DeleteUserAchie"] as const,
  GetClaimedAchievements: [
    "UserAchievement",
    "GetClaimedAchievements",
  ] as const,
};

export default UserAchievementKeys;
