import { Friend } from "@/@types/friend";
import { AcceptFriendRequest } from "@/@types/Requests/AddRequests/acceptFriendRequest";
import { AddFriendRequest } from "@/@types/Requests/AddRequests/addFriendRequest";
import { UserAccount } from "@/@types/userAccount";
import axios from "axios";
import { AuthenticationUtils } from "./AuthenticationUtils";

export const FriendService = {
  AcceptFriend: async (request: AcceptFriendRequest) => {
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      const response = await axios.patch<boolean>(
        `${import.meta.env.VITE_URL}/friend/acceptfriend`,
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
      console.error("Failed to accept friend.");
      throw error;
    }
  },
  AddFriend: async (request: AddFriendRequest) => {
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      const response = await axios.post<boolean>(
        `${import.meta.env.VITE_URL}/friend/addfriend`,
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
      console.error("Failed to add friend.");
      throw error;
    }
  },
  GetAllFriendsByBaseId: async (baseId: string) => {
    try {
      const response = await axios.get<UserAccount[]>(
        `${import.meta.env.VITE_URL}/Friend/getallfriendsbybaseid`,
        {
          params: {
            baseId: baseId,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get all users by baseId", error);
      throw error;
    }
  },
  GetFriendById: async (friendId: number) => {
    try {
      const response = await axios.get<UserAccount[]>(
        `${import.meta.env.VITE_URL}/Friend/getfriendbyid`,
        {
          params: {
            friendId: friendId,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get friend by id, ", error);
      throw error;
    }
  },
  ToggleFriendNotis: async (friendId: number, userId: number) => {
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      const response = await axios.delete<boolean>(
        `${import.meta.env.VITE_URL}/Friend/togglefriendnotis`,
        {
          params: {
            friendId: friendId,
            userId: userId,
          },
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to toggle notis: ", error);
      throw error;
    }
  },
  RemoveFriend: async (friendId: number, userId: number) => {
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      const response = await axios.delete<boolean>(
        `${import.meta.env.VITE_URL}/Friend/removefriend`,
        {
          params: {
            friendId: friendId,
            userId: userId,
          },
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to remove friend: ", error);
      throw error;
    }
  },
  GetBasePendingRequests: async (baseId: number) => {
    try {
      const response = await axios.get<Friend[]>(
        `${import.meta.env.VITE_URL}/Friend/getbasependingrequests`,
        {
          params: {
            baseId: baseId,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get friend by id");
      throw error;
    }
  },
};
