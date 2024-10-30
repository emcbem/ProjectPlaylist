import { PlatformGame } from "@/@types/platformGame";
import { PlatformGameRequest } from "@/@types/Requests/GetRequests/getPlatformGameRequest";
import axios from "axios";

export const PlatformGameService = {
  GetAllPlatformGames: async (platformGameRequest: PlatformGameRequest | undefined) => {
    try {
      const response = await axios.post<PlatformGame[]>(
        `${import.meta.env.VITE_URL}/PlatformGame/getallplatformgames`,
        platformGameRequest,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch games:", error);
      throw error;
    }
  },
  GetAllPlatfromGamesByGameId: async (gameId: number) => {
    try {
      const response = await axios.get<PlatformGame[]>(
        `${
          import.meta.env.VITE_URL
        }/PlatformGame/getallplatformgamesbygame/${gameId}`
      );

      return response.data;
    } catch (error) {
      console.error("Failed to get platform games", error);
      throw error;
    }
  },
  GetPlatformGamesById: async (platformGameId: number) => {
    try {
      const response = await axios.get<PlatformGame[]>(
        `${
          import.meta.env.VITE_URL
        }/PlatformGame/getplatformgamebyid/${platformGameId}`
      );

      return response.data;
    } catch (error) {
      console.error("Failed to get platform game by platform game Id", error);
      throw error;
    }
  },
};
