import { Genre } from "@/@types/genre";
import { AddUserGenreRequest } from "@/@types/Requests/AddRequests/addUserGenreRequest";
import { RemoveUserGenreRequest } from "@/@types/Requests/DeleteRequests/removeUserGenreRequest";
import axios from "axios";
import toast from "react-hot-toast";

export const UserGenreService = {
    AddUserGenre: async (request: AddUserGenreRequest) => {
        try {
            const response = await axios.post<boolean>(
                `${import.meta.env.VITE_URL}/UserGenre/addusergenre`,
                request,
                {
                    headers: {
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
        console.log(request)
        try {
            const response = await axios.delete<boolean>(
                `${import.meta.env.VITE_URL}/UserGenre/deleteusergenre`,
                {
                    params: {
                        request: request,
                    },
                }
            );
            return response.data;
        } catch (error) {
            toast.error("Failed to remove user genre. Try again.")
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
            toast.error("Failed to fetch user genres. Try again.")
            console.error("Failed to fetch user genres:", error);
            throw error;
        }
    },
}