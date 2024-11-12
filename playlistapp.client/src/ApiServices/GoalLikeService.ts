import { AddGoalLikeRequest } from "@/@types/Requests/AddRequests/addGoalLikeRequest";
import axios from "axios";

export const GoalLikeService = {
  addGoalLike: async (addGoalLikeRequest: AddGoalLikeRequest) => {
    console.log("AddGoalLikeRequest: ", addGoalLikeRequest);

    if (!addGoalLikeRequest) {
      console.error("Add goal like request is undefined or empty");
      throw new Error("Add goal like request must be provided");
    }
    try {
      const response = await axios.post<boolean>(
        `${import.meta.env.VITE_URL}/GoalLike/addgoallike`,
        addGoalLikeRequest,
        {
          headers: {
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
};
