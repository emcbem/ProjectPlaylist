import { Goal } from "@/@types/goal";
import { GoalLike } from "@/@types/goalLike";
import { AddGoalLikeRequest } from "@/@types/Requests/AddRequests/addGoalLikeRequest";
import { RemoveGoalLikerequest } from "@/@types/Requests/DeleteRequests/removeGoalLikeRequest";
import { GetGoalLikeRequest } from "@/@types/Requests/GetRequests/getGoalLikeRequest";
import { UpdateGoalLikeRequest } from "@/@types/Requests/UpdateRequests/updateGoalLikeRequest";
import axios from "axios";
import { AuthenticationUtils } from "./AuthenticationUtils";

export const GoalLikeService = {
  addGoalLike: async (addGoalLikeRequest: AddGoalLikeRequest) => {
    if (!addGoalLikeRequest) {
      console.error("Add goal like request is undefined or empty");
      throw new Error("Add goal like request must be provided");
    }
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      const response = await axios.post<boolean>(
        `${import.meta.env.VITE_URL}/GoalLike/addgoallike`,
        addGoalLikeRequest,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to add goal like");
      throw error;
    }
  },
  getGoalLikesFromUser: async (userId: string) => {
    if (!userId) {
      console.error("User id is undefined or empty");
      throw new Error("User id must be provided");
    }
    try {
      const response = await axios.get<Goal[]>(
        `${import.meta.env.VITE_URL}/GoalLike/getgoallikesfromuser`,
        {
          params: {
            userId,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get goal likes from user");
      throw error;
    }
  },
  getGoalLike: async (getGoalLikeRequest: GetGoalLikeRequest) => {
    if (!getGoalLikeRequest) {
      console.error("Get goal like request is undefined or empty");
      throw new Error("Get goal like request must be provided");
    }
    try {
      const response = await axios.post<GoalLike>(
        `${import.meta.env.VITE_URL}/GoalLike/getgoallike`,
        getGoalLikeRequest,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get goal like from request");
      throw error;
    }
  },
  updateGoalLike: async (updateGoalLikeRequest: UpdateGoalLikeRequest) => {
    if (!updateGoalLikeRequest) {
      console.error("Update goal like request is undefined or empty");
      throw new Error("Update goal like request must be provided");
    }
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      const response = await axios.patch<boolean>(
        `${import.meta.env.VITE_URL}/GoalLike/updategoallike`,
        updateGoalLikeRequest,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to update goal like");
      throw error;
    }
  },
  removeGoalLike: async (removeGoalLikeRequest: RemoveGoalLikerequest) => {
    if (!removeGoalLikeRequest) {
      console.error("Remove goal like request is unefined or empty");
      throw new Error("Remove goal like request must be provided");
    }
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      const response = await axios.post<boolean>(
        `${import.meta.env.VITE_URL}/GoalLike/removegoallike`,
        removeGoalLikeRequest,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to remove goal like");
      throw error;
    }
  },
};
