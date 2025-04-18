import { AddUserAchievementLikeRequest } from "@/@types/Requests/AddRequests/addUserAchievementLikeRequest";
import { RemoveUserAchievementLikeRequest } from "@/@types/Requests/DeleteRequests/RemoveUserAchievementLikeRequest";
import { GetUserAchievementLikeRequest } from "@/@types/Requests/GetRequests/getUserAchievementLike";
import { UpdateUserAchievementLikeRequest } from "@/@types/Requests/UpdateRequests/updateUserAchievementLikeRequest";
import { UserAchievement } from "@/@types/userAchievement";
import { UserAchievementLike } from "@/@types/userAchievementLike";
import axios from "axios";
import { AuthenticationUtils } from "./AuthenticationUtils";

export const UserAchievementLikeService = {
  AddUserAchievementLike: async (
    addUserAchievementLikeRequest: AddUserAchievementLikeRequest
  ) => {
    if (!addUserAchievementLikeRequest) {
      console.error("Add user achievement like request is undefined or empty");
      throw new Error("Add user achievement like request must be provided");
    }
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      const response = await axios.post<boolean>(
        `${
          import.meta.env.VITE_URL
        }/UserAchievementLike/adduserachievementlike`,
        addUserAchievementLikeRequest,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
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
  RemoveUserAchievementLike: async (
    removeUserAchievementLikeRequest: RemoveUserAchievementLikeRequest
  ) => {
    if (!removeUserAchievementLikeRequest) {
      console.error(
        "Remove user achievemet like request is undefined or empty"
      );
      throw new Error("Remove user achievement like request must be provided");
    }
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      const resonse = await axios.post<boolean>(
        `${
          import.meta.env.VITE_URL
        }/UserAchievementLike/removeuserachievementlike`,
        removeUserAchievementLikeRequest,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return resonse.data;
    } catch (error) {
      console.error("Failed to remove user achievement like");
      throw error;
    }
  },
  UpdateUserAchievementLike: async (
    updateUserAchievementLikeRequest: UpdateUserAchievementLikeRequest
  ) => {
    if (!updateUserAchievementLikeRequest) {
      console.error(
        "Update user achievement like request is undefined or empty"
      );
      throw new Error("Update user achievement like request must be provided");
    }
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      const response = await axios.patch<boolean>(
        `${
          import.meta.env.VITE_URL
        }/UserAchievementLike/updateuserachievementlike`,
        updateUserAchievementLikeRequest,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to update user achievement like");
      throw error;
    }
  },
  GetUserAchievementLike: async (
    getUserAchievementLikeRequest: GetUserAchievementLikeRequest
  ) => {
    if (!getUserAchievementLikeRequest) {
      console.error("Get user achievement like request is undefined or empty");
      throw new Error("Get user achievement like request must be provided");
    }
    try {
      const response = await axios.post<UserAchievementLike>(
        `${
          import.meta.env.VITE_URL
        }/UserAchievementLike/getuserachievementlike`,
        getUserAchievementLikeRequest,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get user achievement like");
      throw error;
    }
  },
};
