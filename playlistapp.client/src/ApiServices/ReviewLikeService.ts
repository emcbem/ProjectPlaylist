import { AddReviewLikeRequest } from "@/@types/Requests/AddRequests/addReviewLikeRequest";
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
};
