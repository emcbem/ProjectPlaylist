import { Genre } from "@/@types/genre";
import { AddUserGenreRequest } from "@/@types/Requests/AddRequests/addUserGenreRequest";
import { RemoveUserGenreRequest } from "@/@types/Requests/DeleteRequests/removeUserGenreRequest";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthenticationUtils } from "./AuthenticationUtils";

export const UserGenreService = {
  AddUserGenre: async (request: AddUserGenreRequest) => {
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      const response = await axios.post<boolean>(
        `${import.meta.env.VITE_URL}/UserGenre/addusergenre`,
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
      toast.error("Failed to add user genre");
      console.error("Failed to add user genre", error);
      throw error;
    }
  },
  DeleteUserGenre: async (request: RemoveUserGenreRequest) => {
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      const response = await axios.delete<boolean>(
        `${import.meta.env.VITE_URL}/UserGenre/deleteusergenre`,
        {
          data: request, // Use the `data` field to send the request body
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      toast.error("Failed to remove user genre. Try again.");
      console.error("Failed to remove user genre", error);
      throw error;
    }
  },
  GetAllByUser: async (userId: string) => {
    try {
      const response = await axios.get<Genre[]>(
        `${import.meta.env.VITE_URL}/UserGenre/getallbyuser`,
        {
          params: {
            userId: userId,
          },
        }
      );
      return response.data;
    } catch (error) {
      toast.error("Failed to fetch user genres. Try again.");
      console.error("Failed to fetch user genres:", error);
      throw error;
    }
  },
};
