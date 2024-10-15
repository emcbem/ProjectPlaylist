import { Achievement } from "@/@types/achievement";
import axios from "axios";

export const AchievementService = {
  GetAchievementsByPlatformGame: async (gameId: number) => {
    try {
      const response = await axios.get<Achievement[]>(
        `${import.meta.env.VITE_URL}/Achievement/getachievementsbygame`,
        {
          params: {
            gameId: gameId,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Failed to fetch achievements: ", error);
      throw error;
    }
    /*
        const allAchievements = AchievementQueries.useGetAchievementByPlatformGameId(
        Number(platformGameId)
        ).data;
    */
  },
  GetAchievementById: async (achievementId: number) => {
    try {
      const response = await axios.get<Achievement>(
        `${import.meta.env.VITE_URL}/Achievement/getachievementbyid`,
        {
          params: {
            achievementId: achievementId,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Failed to fetch achievement: ", error);
      throw error;
    }
    /*
        const achievement = AchievementQueries.useGetAchievementById(achievementId).data;
    */
  },
  GetAchievementByName: async (achievementName: string) => {
    try {
      const response = await axios.get<Achievement[]>(
        `${import.meta.env.VITE_URL}/Achievement/getachievementbyname`,
        {
          params: {
            achievementName: achievementName,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Failed to fetch achievement: ", error);
      throw error;
    }
    /*
        const achievementByName = AchievementQueries.useGetAchievementByName(achievementName).data;
    */
  },
};
