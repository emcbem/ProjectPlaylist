import { SteamSummary } from "@/@types/steamSummary";
import axios from "axios";

export const SteamService = {
//   getDataFromSingleGame: async (userId: string) => {
//     try {
//       console.log("AHHHHHH");
//       console.log("Steam Id From Steam Service ", userId);
//       const response = await axios.get<string>("");
//       console.log("Response data ", response.data);
//       return response.data;
//     } catch (error) {
//       console.error("something went wrong");
//     }
//   },
  GetSteamUserActionLog: async (userSteamId: string) => {
    try {
      const response = await axios.get<SteamSummary[]>(
        `${import.meta.env.VITE_URL}/steam/getuseractionlog`,
        {
          params: {
            username: userSteamId,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get summary from Steam. Is you're Steam account private? error:", error);
      throw error;
    }
  },
};
