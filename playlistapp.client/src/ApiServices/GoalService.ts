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
};
