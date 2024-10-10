import axios from "axios";
import { Game } from "../@types/game";

export const GameService = {
  GetAllGames: async (): Promise<Game[]> => {
    try {
      const response = await axios.get<Game[]>(
        `${import.meta.env.VITE_URL}/game/getall`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch games:", error);
      throw error;
    }
  },

  GetGameById: async (gameId: number | undefined): Promise<Game> => {
    if (!gameId) {
      console.error("Game id is undefined or not found");
      throw new Error("Game id must be provided");
    }

    try {
      const response = await axios.get<Game>(
        `${import.meta.env.VITE_URL}/Game/getgamebyid`,
        {
          params: {
            gameId: gameId,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch Game:", error);
      throw error;
    }
  },
};
