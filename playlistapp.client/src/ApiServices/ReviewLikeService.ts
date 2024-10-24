import { GameReview } from "@/@types/gameReview";
import { AddReviewLikeRequest } from "@/@types/Requests/AddRequests/addReviewLikeRequest";
import { RemoveReviewLikeRequest } from "@/@types/Requests/DeleteRequests/removeReviewLikeRequest";
import axios from "axios";

export const ReviewLikeService = {
  addReviewLike: async (addReviewLikeRequest: AddReviewLikeRequest) => {
    if (!addReviewLikeRequest) {
      console.error("Add review like request is undefined or empty");
      throw new Error("Add review like request must be provided");
    }
    try {
      const response = await axios.post<boolean>(
        `${import.meta.env.VITE_URL}/ReviewLike/addreviewlike`,
        addReviewLikeRequest,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to add like to review");
      throw error;
    }
  },
  getAllReviewLikesByUser: async (userId: string) => {
    if (!userId) {
      console.error("User id is undefined or empty");
      throw new Error("User id must be provided");
    }
    try {
      const response = await axios.get<GameReview[]>(
        `${import.meta.env.VITE_URL}/ReviewLike/getallbyuser`,
        {
          params: {
            userId: userId,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get all review likes for user: ", error);
      throw error;
    }
  },
  removeReviewLike: async (
    removeReviewLikeRequest: RemoveReviewLikeRequest
  ) => {
    if (!removeReviewLikeRequest) {
      console.error("Remove review like request is undefined or empty");
      throw new Error("Remove review like request must be provided");
    }
    try {
      const response = await axios.post<boolean>(
        `${import.meta.env.VITE_URL}/ReviewLike/removereviewlike`,
        removeReviewLikeRequest,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to remove like from game review: ", error);
      throw error;
    }
  },
};
