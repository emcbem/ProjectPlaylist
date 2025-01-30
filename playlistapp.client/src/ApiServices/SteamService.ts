import { SteamSummary } from "@/@types/steamSummary";
import axios from "axios";

export const SteamService = {
  GetSteamUserActionLog: async (userSteamId: string) => {
    if (!userSteamId) {
      console.error("No steam id");
    }
    try {
      console.log("in service: ", userSteamId)
      const response = await axios.post<SteamSummary[]>(
        `${import.meta.env.VITE_URL}/Steam/getuseractionlog/${ userSteamId }`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get summary from Steam. Is you're Steam account private? error:", error);
      throw error;
    }
  },
};
