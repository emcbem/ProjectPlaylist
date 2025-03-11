import { ItemAction } from "@/@types/Combination/itemAction";
import { PlaystationContext } from "@/@types/Playstation/playstationContext";
import { PlaystationDTO } from "@/@types/Playstation/playstationDTO";
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
  orchestrateInitialPlaystationAccountSync: async (
    playstationDTO: PlaystationDTO
  ) => {
    if (!playstationDTO) {
      console.error("Playstation DTO must be provided");
      throw new Error("Playstation DTO was undefined or empty");
    }
    try {
      const response = await axios.post<ItemAction[]>(
        `${import.meta.env.VITE_URL}/Playstation/orchestrator`,
        playstationDTO,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Failed to orchestrate initial sync of playstation account"
      );
      throw error;
    }
  },
};
