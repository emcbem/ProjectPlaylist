import axios from "axios";
import { Game } from "../@types/game";
import { GetGamesRequest } from "@/@types/Requests/GetRequests/getGamesRequest";

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
    console.log("Getting games by query: ", query);
    try {
      const response = await axios.get<Game[]>(
        `${import.meta.env.VITE_URL}/Game/getgamebyname`,
        {
          params: {
            gameName: query,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch games with query:", error);
      throw error;
    }
  },
  GetFilteredGamesByRequest: async (
    request: GetGamesRequest
  ): Promise<Game[]> => {
    console.log("Getting games from a request with title: " + request.title);
    console.log(request);
    try {
      const response = await axios.post<Game[]>(
        `${import.meta.env.VITE_URL}/game/filtergamesbyrequest`,

        request
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch games with query:", error);
      throw error;
    }
  },
};
