import { UserAchievement } from "@/@types/userAchievement";

const useGetEarnedAchievements = (
  allAchievements: UserAchievement[],
  platformGameId: number
): UserAchievement[] => {
  return allAchievements.filter(
    (x) => x.achievement.platformGameId === platformGameId
  );
};

export default useGetEarnedAchievements;
