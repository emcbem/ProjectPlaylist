import { AchievementService } from "@/ApiServices/AchievementService";
import { useQuery } from "@tanstack/react-query";
import keys from "@/QueryKeys/AchievementKeys";

export const AchievementQueries = {
  useGetAchievementByPlatformGameId: (platformGameId: number) => {
    return useQuery({
      queryKey: keys.GetAchievementByGame(platformGameId),
      queryFn: () =>
        AchievementService.GetAchievementsByPlatformGame(platformGameId),
    });
    /*
      const allAchievements = AchievementQueries.useGetAchievementByPlatformGameId(
      Number(platformGameId)
      ).data;
    */
  },
  useGetAchievementById: (achievementId: number) => {
    return useQuery({
      queryKey: keys.GetAchievementById,
      queryFn: () => AchievementService.GetAchievementById(achievementId),
    });
    /*
      const achievement = AchievementQueries.useGetAchievementById(achievementId).data;
    */
  },
  useGetAchievementByName: (achievementName: string) => {
    return useQuery({
      queryKey: keys.GetAchievementByName,
      queryFn: () => AchievementService.GetAchievementByName(achievementName),
    });
    /*
      const achievementByName = AchievementQueries.useGetAchievementByName(achievementName).data;
    */
  },
};
