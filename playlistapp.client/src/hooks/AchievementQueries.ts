import { AchievementService } from "@/ApiServices/AchievementService";
import { useQuery } from "@tanstack/react-query";
import keys from "@/QueryKeys/AchievementKeys";

export const AchievementQueries = {
  useGetAchievementByPlatformGameId: (platformGameId: number) => {
    return useQuery({
      queryKey: keys.GetAchievementByGame,
      queryFn: () =>
        AchievementService.GetAchievementsByPlatformGame(platformGameId),
    });
  },
  useGetAchievementById: (achievementId: number) => {
    return useQuery({
      queryKey: keys.GetAchievementById,
      queryFn: () => AchievementService.GetAchievementById(achievementId),
    });
  },
  useGetAchievementByName: (achievementName: string) => {
    return useQuery({
      queryKey: keys.GetAchievementByName,
      queryFn: () => AchievementService.GetAchievementByName(achievementName),
    });
  },
};
