import { Achievement } from "@/@types/achievement";
import { AddUserAchievementRequest } from "@/@types/Requests/AddRequests/addUserAchievementRequest";
import { GetClaimedAchievementsForGameForUserRequest } from "@/@types/Requests/GetRequests/getClaimedAchievementsForGameForUserRequest";
import { UpdateUserAchievementRequest } from "@/@types/Requests/UpdateRequests/updateUserAchievementRequest";
import { UserAchievement } from "@/@types/userAchievement";
import axios from "axios";
import { AuthenticationUtils } from "./AuthenticationUtils";

export const UserAchievementService = {
  AddUserAchievement: async (
    addUserAchievementRequest: AddUserAchievementRequest
  ) => {
    if (!addUserAchievementRequest) {
      console.error("Add user achievement request is undefined or empty");
      throw new Error("Add user achievement request must be provided");
    }
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      const response = await axios.post<number>(
        `${import.meta.env.VITE_URL}/UserAchievement/adduserachievement`,
        addUserAchievementRequest,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to add user achievement: ", error);
      throw error;
    }
  },
  GetUserAchievementByAchievementId: async (achievementId: number) => {
    if (!achievementId) {
      console.error("Achievement Id is undefined or empty");
      throw new Error("Achievemetn Id must be provided");
    }
    try {
      const response = await axios.get<UserAchievement[]>(
        `${
          import.meta.env.VITE_URL
        }/UserAchievement/getuserachievementbyachievementid`,
        {
          params: {
            achievementId: achievementId,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get user achievement: ", error);
      throw error;
    }
  },
  GetUserAchievementById: async (userAchievementId: number) => {
    if (!userAchievementId) {
      console.error("User Achievement Id is undefined or empty");
      throw new Error("User Achievement Id must be provided");
    }
    try {
      const response = await axios.get<UserAchievement>(
        `${import.meta.env.VITE_URL}/UserAchievement/getuserachievementbyid`,
        {
          params: {
            userAchievementId: userAchievementId,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get user achievement: ", error);
      throw error;
    }
  },
  GetUserAchievementByUserId: async (userId: string) => {
    if (!userId) {
      console.error("User Id is undefined or empty");
      throw new Error("User Id must be provided");
    }
    try {
      const response = await axios.get<UserAchievement[]>(
        `${
          import.meta.env.VITE_URL
        }/UserAchievement/getuserachievementbyuserid`,
        {
          params: {
            userId: userId,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get user achievement");
      throw error;
    }
  },
  UpdateUserAchievement: async (
    updateUserAchievementRequest: UpdateUserAchievementRequest
  ) => {
    if (!updateUserAchievementRequest) {
      console.error("Update User Achievement Request is undefined or empty");
      throw new Error("Update User Achievement Request must be provided");
    }
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      const response = await axios.patch<UserAchievement>(
        `${import.meta.env.VITE_URL}/UserAchievement/updateuserachievement`,
        updateUserAchievementRequest,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to update user achievement: ", error);
      throw error;
    }
  },
  DeleteUserAchievement: async (userAchievementId: number) => {
    if (!userAchievementId) {
      console.error("User Achievement Id is undefined or empty");
      throw new Error("User Achievement Id must be provided");
    }
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      const response = await axios.delete<boolean>(
        `${import.meta.env.VITE_URL}/UserAchievement/deleteuserachievement`,
        {
          params: {
            id: userAchievementId,
          },
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to delete user achievement: ", error);
      throw error;
    }
  },
  GetClaimedAchievementsForGameForUser: async (
    getClaimedAchievementsRequest: GetClaimedAchievementsForGameForUserRequest
  ) => {
    if (!getClaimedAchievementsRequest) {
      console.error("Get Claimed Achievements Request is undefined or empty");
      throw new Error("Get Claimed Achievements Request must be provided");
    }
    try {
      const response = await axios.post<Achievement[]>(
        `${
          import.meta.env.VITE_URL
        }/UserAchievement/getachievementsfromgamefromuser`,
        getClaimedAchievementsRequest,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get claimed achievements for game and user");
      throw error;
    }
  },
};
