import { AddUserPlatformRequest } from "@/@types/Requests/AddRequests/addUserPlatformRequest";
import { UpdateUserPlatformRequest } from "@/@types/Requests/UpdateRequests/UpdateUserPlatformRequest";
import { UserPlatform } from "@/@types/userPlatform";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthenticationUtils } from "./AuthenticationUtils";

export const UserPlatformService = {
  GetAllByUser: async (userId: string) => {
    try {
      const response = await axios.get<UserPlatform[]>(
        `${import.meta.env.VITE_URL}/UserPlatform/getallbyuser`,
        {
          params: {
            userId: userId,
          },
        }
      );
      return response.data;
    } catch (error) {
      toast.error("Failed to fetch user platforms. Try again.");
      console.error("Failed to fetch user platforms:", error);
      throw error;
    }
  },
  UpdateUserPlatform: async (request: UpdateUserPlatformRequest) => {
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      const response = await axios.patch<UserPlatform>(
        `${import.meta.env.VITE_URL}/UserPlatform/updateuserplatform`,
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
      console.error("Failed to update user platforms");
      throw error;
    }
  },
  AddUserPlatform: async (request: AddUserPlatformRequest) => {
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      const response = await axios.post<boolean>(
        `${import.meta.env.VITE_URL}/UserPlatform/adduserplatform`,
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
      toast.error("Failed to add user platform");
      console.error("Failed to add user platform", error);
      throw error;
    }
  },
  DeleteUserPlatform: async (userPlatformId: number) => {
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      const response = await axios.delete<boolean>(
        `${import.meta.env.VITE_URL}/UserPlatform/deleteuserplatform`,
        {
          params: {
            userPlatformId: userPlatformId,
          },
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      toast.error("Failed to remove user platform. Try again.");
      console.error("Failed to remove user platform", error);
      throw error;
    }
  },
};
