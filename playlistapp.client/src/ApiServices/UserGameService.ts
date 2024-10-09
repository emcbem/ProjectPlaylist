import { AddUserGameRequest } from "@/@types/Requests/addUserGameRequest";
import { UserGame } from "@/@types/usergame";
import axios from "axios";

export const UserGameService = {
  GetAllUserGamesByUser: async (userId: string | undefined) => {
    console.log("Getting all user games by user id: ", userId)
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
      console.log("Response from getting user games: ", response.data)
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user games:", error);
      throw error;
    }
  },
  AddUserGame: async (addUserGameRequest: AddUserGameRequest) => {
    console.log("Adding user game request: ", addUserGameRequest)
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
      console.log("Response adding user game request: ", response)
      return response.data;
    } catch (error) {
      console.error("Failed to add user game", error);
      throw error;
    }
  },
  GetAllUserGamesByUserGameId: async (userGameId: number | undefined) => {
    if (!userGameId) {
      console.error("Game id was not found");
      throw new Error("Game id must be provided");
    }
    try {
      const response = await axios.get<UserGame>(
        `${import.meta.env.VITE_URL}/UserGame/getusergamebyid`,
        {
          params: {
            userGameId: userGameId,
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
