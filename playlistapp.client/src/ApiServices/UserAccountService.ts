import { UpdateUserRequest } from "@/@types/Requests/UpdateRequests/updateUserRequest";
import { UserAccount } from "@/@types/userAccount";
import axios from "axios";
import { AuthenticationUtils } from "./AuthenticationUtils";

export const UserAccountService = {
  GetUserByUsername: async (
    username: string | undefined
  ): Promise<UserAccount> => {
    if (!username) {
      console.error("Username was undefined or empty");
      throw new Error("Username must be provided");
    }
    try {
      const response = await axios.get<UserAccount>(
        `${import.meta.env.VITE_URL}/User/getusersbyname`,
        {
          params: {
            username: username,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get user");
      throw error;
    }
  },
  GetUsersByQueryString: async (query: string) => {
    try {
      const response = await axios.get<UserAccount[]>(
        `${import.meta.env.VITE_URL}/User/search`,
        {
          params: {
            query: query,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get users");
      throw error;
    }
  },
  GetUserByAuthId: async (authId: string) => {
    if (!authId) {
      console.error("Auth id was undefined or empty");
      throw new Error("Auth id must be provided");
    }
    try {
      const response = await axios.get<UserAccount>(
        `${import.meta.env.VITE_URL}/User/getuserbyauthid`,
        {
          params: {
            authId: authId,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get user");
      throw error;
    }
  },
  GetUserById: async (userId: string) => {
    if (!userId) {
      console.error("User id was undefined or empty");
      throw new Error("User id must be provided");
    }
    try {
      const response = await axios.get<UserAccount>(
        `${import.meta.env.VITE_URL}/User/getuserbyid`,
        {
          params: {
            userId: userId,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get user");
      throw error;
    }
  },
  UpdateUser: async (request: UpdateUserRequest) => {
    if (!request) {
      console.error("Update user request was undefined or empty");
      throw new Error("Update user request must be provided");
    }
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      const response = await axios.patch<UserAccount>(
        `${import.meta.env.VITE_URL}/User/updateuser`,
        request,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to update user");
      throw error;
    }
  },
  AddUserStrike: async (userGuid: string) => {
    if (!userGuid) {
      console.error("Update user request was undefined or empty");
      throw new Error("Update user request must be provided");
    }
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      const response = await axios.patch<boolean>(
        `${import.meta.env.VITE_URL}/User/strikeuser`,
        userGuid,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to strike user.");
      throw error;
    }
  },
  DeleteUser: async (userId: string) => {
    if (!userId) {
      console.error("User id was undefined or empty");
      throw new Error("User id must be provided");
    }
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      const response = await axios.delete<boolean>(
        `${import.meta.env.VITE_URL}/User/deleteuser`,
        {
          params: {
            userId: userId,
          },
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to delete user");
      throw error;
    }
  },
};
