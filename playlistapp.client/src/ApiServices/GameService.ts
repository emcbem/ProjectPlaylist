import axios from "axios";
import { Game } from "../@types/game";
import { GetGamesRequest } from "@/@types/Requests/GetRequests/getGamesRequest";
import { Page } from "@/@types/Page";

export const GameService = {
  GetAllGames: async (): Promise<Game[]> => {
    try {
      const response = await axios.get<Game[]>(
        `${import.meta.env.VITE_URL}/game/getall`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch all games:", error);
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
  GetGamesByQuery: async (query: string | undefined): Promise<Game[]> => {
    try {
      const response = await axios.get<Game[]>(
        `${import.meta.env.VITE_URL}/Game/getgamebyname`,
        {
          params: {
            gameName: query,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch games with query:", error);
      throw error;
    }
  },

  GetFilteredGamesByRequest: async (page: number, searchRequest: GetGamesRequest): Promise<Page> => {
    const clone = { ...searchRequest };
    clone.page = page;
    try {
      const response = await axios.post<Game[]>(
        `${import.meta.env.VITE_URL}/game/filtergamesbyrequest`,
        clone
      );

      return {
        pageGames: response.data,
        previousCursor: page - 1,
        nextCursor: page + 1,
      };
    } catch (error) {
      console.error("Failed to fetch games with query:", error);
      throw error;
    }
  },
};
