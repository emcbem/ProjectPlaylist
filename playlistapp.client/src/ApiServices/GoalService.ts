import { Goal } from "@/@types/goal";
import { AddGoalRequest } from "@/@types/Requests/AddRequests/addGoalRequest";
import axios from "axios";

export const GoalService = {
  addGoal: async (addGoalRequest: AddGoalRequest) => {
    if (!addGoalRequest) {
      console.error("Add goal request is undefined or empty");
      throw new Error("Add goal request must be provided");
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/Goal/addgoal`,
        addGoalRequest,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to add goal");
      throw error;
    }
  },
  getGoalById: async (goalId: number) => {
    if (!goalId) {
      console.error("Goal id is undefined or empty");
      throw new Error("Goal id must be provided");
    }
    try {
      const response = await axios.get<Goal>(
        `${import.meta.env.VITE_URL}/Goal/getgoalbyid`,
        {
          params: {
            goalId: goalId,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get goal");
      throw error;
    }
  },
  getGoalsFromUser: async (userId: string) => {
    if (!userId) {
      console.error("User id is undefined or empty");
      throw new Error("User id must be provided");
    }
    try {
      const response = await axios.get<Goal[]>(
        `${import.meta.env.VITE_URL}/Goal/getgoalsfromuser`,
        {
          params: {
            userId: userId,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get all goals for user");
      throw error;
    }
  },
};
