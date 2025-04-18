import { PlatformGame } from "@/@types/platformGame";
import { AddUserGameRequest } from "@/@types/Requests/AddRequests/addUserGameRequest";
import { updateUserGameRequest } from "@/@types/Requests/UpdateRequests/updateUserGameRequest";
import { UserGame } from "@/@types/usergame";
import axios from "axios";
import { AuthenticationUtils } from "./AuthenticationUtils";

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
  GetUserGameByUserGameId: async (userGameId: number | undefined) => {
    if (!userGameId) {
      console.error("Game id was not found");
      throw new Error("Game id must be provided to get all user games.");
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
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user games:", error);
      throw error;
    }
  },
  AddUserGame: async (addUserGameRequest: AddUserGameRequest | undefined) => {
    if (!addUserGameRequest) {
      console.error("Add user game request is undefined or empty");
      throw new Error("Add user game request must be provided");
    }
    let jwtToken = AuthenticationUtils.GetJwtToken();
    try {
      const response = await axios.post<number>(
        `${import.meta.env.VITE_URL}/UserGame/addusergame`,
        addUserGameRequest,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
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
  DeleteUserGame: async (userGameId: number | undefined) => {
    if (!userGameId) {
      console.error("Game id was not found");
      throw new Error("Game id must be provided");
    }
    let jwtToken = AuthenticationUtils.GetJwtToken();
    try {
      const response = await axios.delete<boolean>(
        `${import.meta.env.VITE_URL}/UserGame/deleteusergame`,
        {
          params: { userGameId },
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to delete selected user game: ", error);
      throw error;
    }
  },
  UpdateUserGame: async (updateUserGameRequest: updateUserGameRequest) => {
    if (!updateUserGameRequest) {
      console.error("Update user game request was not found");
      throw new Error("Update user game request must be provided");
    }
    let jwtToken = AuthenticationUtils.GetJwtToken();
    try {
      const response = await axios.patch<PlatformGame>(
        `${import.meta.env.VITE_URL}/UserGame/updateusergame`,
        updateUserGameRequest,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Failed to update user game",
          error.response?.data || error.message
        );
      } else {
        console.error("An unexpected error occurred", error);
      }
      throw error;
    }
  },
};
