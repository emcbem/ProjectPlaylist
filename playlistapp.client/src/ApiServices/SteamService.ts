import { ItemAction } from "@/@types/Combination/itemAction";
import { SteamActionLogRequest } from "@/@types/Requests/GetRequests/getSteamActionLogRequest";
import axios from "axios";
import { AuthenticationUtils } from "./AuthenticationUtils";

export const SteamService = {
  GetSteamUserActionLog: async (
    steamActionLogRequest: SteamActionLogRequest
  ) => {
    if (!steamActionLogRequest) {
      console.error("No Steam Action Log Request provided.");
    }
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      const response = await axios.post<ItemAction[]>(
        `${import.meta.env.VITE_URL}/Steam/getuseractionlog`,
        steamActionLogRequest,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
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
};
