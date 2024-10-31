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
  GetAllPlatfromGamesByGame: async (gameId: number) => {
    try {
      const response = await axios.get<PlatformGame[]>(
        `${
          import.meta.env.VITE_URL
        }/PlatformGame/getallplatformgamesbygame/`,
        {
          params: {
            gameId: gameId
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get platform games", error);
      throw error;
    }
  },
};
