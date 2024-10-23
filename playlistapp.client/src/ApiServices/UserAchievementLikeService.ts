import { AddUserAchievementLikeRequest } from "@/@types/Requests/AddRequests/addUserAchievementLikeRequest";
import { UserAchievement } from "@/@types/userAchievement";
import axios from "axios";

export const UserAchievementLikeService = {
  AddUserAchievementLike: async (
    addUserAchievementLikeRequest: AddUserAchievementLikeRequest
  ) => {
    if (!addUserAchievementLikeRequest) {
      console.error("Add user achievement like request is undefined or empty");
      throw new Error("Add user achievement like request must be provided");
    }
    try {
      const response = await axios.post<boolean>(
        `${
          import.meta.env.VITE_URL
        }/UserAchievementLike/adduserachievementlike`,
        addUserAchievementLikeRequest,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to add like to achievement: ", error);
      throw error;
    }
  },
  GetUserAchievementLikesFromUserId: async (userId: string) => {
    if (!userId) {
      console.error("User id is undefined or empty");
      throw new Error("User id must be provided");
    }
    try {
      const response = await axios.get<UserAchievement[]>(
        `${
          import.meta.env.VITE_URL
        }/UserAchievementLike/getachievementuserlikesfromuserid`,
        {
          params: {
            userId: userId,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get user achievement like: ", error);
      throw error;
    }
  },
};
