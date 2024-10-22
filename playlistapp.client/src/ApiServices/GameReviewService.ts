import { GameReview } from "@/@types/gameReview";
import { AddGameReviewRequest } from "@/@types/Requests/AddRequests/addGameReviewRequest";
import axios from "axios";

export const GameReviewService = {
  AddGameReview: async (addGameReviewRequest: AddGameReviewRequest) => {
    try {
      const response = await axios.post<number>(
        `${import.meta.env.VITE_URL}/GameReview/addgamereview`,
        addGameReviewRequest,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to add review to game: ", error);
      throw error;
    }
  },
  GetGameReviewById: async (gameReviewId: number) => {
    try {
      const response = await axios.get<GameReview>(
        `${import.meta.env.VITE_URL}/GameReview/getgamereviewbyid`,
        {
          params: {
            gameReviewId: gameReviewId,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get game review: ", error);
      throw error;
    }
  },
};