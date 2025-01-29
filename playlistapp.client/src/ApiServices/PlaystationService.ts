import { PlaystationContext } from "@/@types/Playstation/playstationContext";
import { PlaystationUser } from "@/@types/Playstation/playstationUser";
import axios from "axios";

export const PlaystationService = {
  getPlaystationAuthenticationService: async () => {
    try {
      const response = await axios.post<PlaystationContext>(
        `${import.meta.env.VITE_URL}/Playstation/gettoken`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get new access token from playstation");
      throw error;
    }
  },
  getPlaystationUsersByUsername: async (username: string) => {
    if (!username) {
      console.error("Playstation Username must be provided");
      throw new Error("Playstation Username was undefined or empty");
    }
    try {
      const response = await axios.post<PlaystationUser[]>(
        `${import.meta.env.VITE_URL}/Playstation/searchplayers`,
        username,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        `Failed to get any Playstation Users with username: ${username}`
      );
      throw error;
    }
  },
};
