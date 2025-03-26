import { List } from "@/@types/list";
import { AddListRequest } from "@/@types/Requests/AddRequests/addListRequest";
import { UpdateListRequest } from "@/@types/Requests/UpdateRequests/updateListRequest";
import axios from "axios";
import { AuthenticationUtils } from "./AuthenticationUtils";

export const ListService = {
  AddList: async (listRequest: AddListRequest) => {
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      const response = await axios.post<number>(
        `${import.meta.env.VITE_URL}/list/addlist`,
        listRequest,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to add List:", error);
      throw error;
    }
  },

  GetListsByUserId: async (userId: string) => {
    try {
      const response = await axios.get<List[]>(
        `${import.meta.env.VITE_URL}/list/getalllistsbyuser`,
        {
          params: {
            userId: userId,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch list by user id:", error);
      throw error;
    }
  },

  GetListByListId: async (listId: number) => {
    try {
      const response = await axios.get<List>(
        `${import.meta.env.VITE_URL}/list/getlistbyid`,
        {
          params: {
            listId: listId,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch list:", error);
      throw error;
    }
  },

  UpdateList: async (listRequest: UpdateListRequest) => {
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      const response = await axios.patch<List>(
        `${import.meta.env.VITE_URL}/list/updatelist`,
        listRequest,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch list:", error);
      throw error;
    }
  },

  DeleteList: async (listId: number) => {
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      const resonse = await axios.delete<boolean>(
        `${import.meta.env.VITE_URL}/list/deletelist`,
        {
          params: {
            listId: listId,
          },
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return resonse.data;
    } catch (error) {
      console.error("Failed to remove user achievement like");
      throw error;
    }
  },
};
