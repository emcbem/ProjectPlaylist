import { GameReview } from "@/@types/gameReview";
import { AddGameReviewRequest } from "@/@types/Requests/AddRequests/addGameReviewRequest";
import { UpdateGameReviewRequest } from "@/@types/Requests/UpdateRequests/updateGameReviewRequest";
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
  GetAllGameReviewsByGame: async (gameId: number) => {
    try {
      const response = await axios.get<GameReview[]>(
        `${import.meta.env.VITE_URL}/GameReview/getallgamereviewsbygame`,
        {
          params: {
            gameId: gameId,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get all reviews for game: ", error);
      throw error;
    }
  },
  UpdateGameReview: async (
    updateGameReviewRequest: UpdateGameReviewRequest
  ) => {
    try {
      const response = await axios.patch<GameReview>(
        `${import.meta.env.VITE_URL}/GameReview/updategamereview`,
        updateGameReviewRequest,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to updated game review: ", error);
      throw error;
    }
  },
};
