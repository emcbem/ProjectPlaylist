import { ActionItem } from "@/@types/steamSummary";
import axios from "axios";

export const SteamService = {
  GetSteamUserActionLog: async (userSteamId: string) => {
    if (!userSteamId) {
      console.error("No steam id");
    }
    try {
      const response = await axios.post<ActionItem[]>(
        `${import.meta.env.VITE_URL}/Steam/getuseractionlog/${userSteamId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        "Failed to get summary from Steam. Is you're Steam account private? error:",
        error
      );
      throw error;
    }
  },
  // AuthenticateWithSteam: async () => {
  //   console.log("authenticating in service");
  //   try {
  //     this.href
  //     //await axios.get(`${import.meta.env.VITE_URL}/Steam/auth/steam`);
  //   } catch (error) {
  //     console.error("Failed to authenticate with Steam: ", error);
  //     throw error;
  //   }
  // },
};
