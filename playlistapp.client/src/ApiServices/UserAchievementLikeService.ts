import { AddUserAchievementLikeRequest } from "@/@types/Requests/AddRequests/addUserAchievementLikeRequest";
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
      const response = await axios.post<number>(
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
};
