import { AddUserRequest } from "@/@types/Requests/AddRequests/addUserRequest";
import { UpdateUserRequest } from "@/@types/Requests/UpdateRequests/updateUserRequest";
import { UserAccount } from "@/@types/userAccount";
import axios from "axios";

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
  AddNewUser: async (addUserRequest: AddUserRequest) => {
    if (!addUserRequest) {
      console.error("Add user request was undefined or empty");
      throw new Error("Add user request must be provided");
    }
    try {
      const response = await axios.post<boolean>(
        `${import.meta.env.VITE_URL}/User/addnewuser`,
        addUserRequest,
        {
          headers: {
            "Content-Type": "application/json",
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
      const response = await axios.patch<UserAccount>(
        `${import.meta.env.VITE_URL}/User/updateuser`,
        request,
        {
          headers: {
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
  DeleteUser: async (userId: string) => {
    if (!userId) {
      console.error("User id was undefined or empty");
      throw new Error("User id must be provided");
    }
    try {
      const response = await axios.delete<boolean>(
        `${import.meta.env.VITE_URL}/User/deleteuser`,
        {
          params: {
            userId: userId,
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
