import { AddUserGameRequest } from "@/@types/Requests/addUserGameRequest";
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
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user games:", error);
      throw error;
    }
  },
  AddUserGame: async (addUserGameRequest: AddUserGameRequest) => {
    if (!addUserGameRequest) {
      console.error("Add user game request is undefined or empty");
      throw new Error("Add user game request must be provided");
    }
    try {
      const response = await axios.post<UserGame>(
        `${import.meta.env.VITE_URL}/UserGame/addusergame`,
        addUserGameRequest,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to add user game", error);
      throw error;
    }
  },
  GetAllUserGamesByGame: async (gameId: number | undefined) => {
    if (!gameId) {
      console.error("Game id was not found");
      throw new Error("Game id must be provided");
    }
    try {
      const response = await axios.get<UserGame[]>(
        `${import.meta.env.VITE_URL}/UserGame/getusergamebyid`,
        {
          params: {
            userGameId: gameId,
          },
        }
      );
      return response.data
    } catch (error) {
      console.error("Failed to fetch user games:", error);
      throw error;
    }
  }
};
