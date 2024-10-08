import { PlatformGame } from "@/@types/platformGame";
import { PlatformGameRequest } from "@/@types/Requests/getPlatformGameRequest";
import axios from "axios";

export const PlatformGameService = {
  GetAllPlatformGames: async (platformGameRequest: PlatformGameRequest) => {
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
};
