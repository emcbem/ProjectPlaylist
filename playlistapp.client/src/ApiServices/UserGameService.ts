import { UserGame } from "@/@types/usergame";
import axios from "axios";

export const UserGameService = {
  GetAllUserGamesByUser: async (userId: string | undefined) => {
    if (!userId) {
      console.error("User id is undefined or empty");
      throw new Error("User Id must be provided.");
    }
    try {
      const response = await axios.get<UserGame[]>(
        `${import.meta.env.VITE_URL}/UserGame/getusergamebyuser`,
        {
          params: {
            userId: userId,
          },
        }
      );
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user games:", error);
      throw error;
    }
  },
};
