import { GameReview } from "@/@types/gameReview";
import { AddReviewLikeRequest } from "@/@types/Requests/AddRequests/addReviewLikeRequest";
import { RemoveReviewLikeRequest } from "@/@types/Requests/DeleteRequests/removeReviewLikeRequest";
import { GetReviewLikeRequest } from "@/@types/Requests/GetRequests/getReviewLikeRequest";
import { UpdateReviewLikeRequest } from "@/@types/Requests/UpdateRequests/updateReviewLikeRequest";
import { ReviewLike } from "@/@types/reviewLike";
import axios from "axios";
import { AuthenticationUtils } from "./AuthenticationUtils";

export const ReviewLikeService = {
  addReviewLike: async (addReviewLikeRequest: AddReviewLikeRequest) => {
    if (!addReviewLikeRequest) {
      console.error("Add review like request is undefined or empty");
      throw new Error("Add review like request must be provided");
    }
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      const response = await axios.post<boolean>(
        `${import.meta.env.VITE_URL}/ReviewLike/addreviewlike`,
        addReviewLikeRequest,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
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
      let jwtToken = AuthenticationUtils.GetJwtToken();
      const response = await axios.post<boolean>(
        `${import.meta.env.VITE_URL}/ReviewLike/removereviewlike`,
        removeReviewLikeRequest,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
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
  updateReviewLike: async (
    updateReviewLikeRequest: UpdateReviewLikeRequest
  ) => {
    if (!updateReviewLikeRequest) {
      console.error("Update review like request is undefined or empty");
      throw new Error("Update review like request must be provided");
    }
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      const response = await axios.patch<boolean>(
        `${import.meta.env.VITE_URL}/ReviewLike/updatereviewlike`,
        updateReviewLikeRequest,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to update like on review: ", error);
      throw error;
    }
  },
  getReviewLike: async (getReviewLikeRequest: GetReviewLikeRequest) => {
    if (!getReviewLikeRequest) {
      console.error("Get review like request is undefined or empty");
      throw new Error("Get review like request must be provided");
    }
    try {
      const response = await axios.post<ReviewLike>(
        `${import.meta.env.VITE_URL}/ReviewLike/getreviewlike`,
        getReviewLikeRequest,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get review like");
      throw error;
    }
  },
};
