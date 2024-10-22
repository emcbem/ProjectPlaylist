
import { List } from "@/@types/list";
import { AddListRequest } from "@/@types/Requests/addListRequest";
import { UpdateListRequest } from "@/@types/Requests/UpdateRequests/updateListRequest";
import axios from "axios";

export const ListService = {

    AddList: async (listRequest: AddListRequest) => {
        try {
            const response = await axios.post<number>(
                `${import.meta.env.VITE_URL}/list/addlist`,
                listRequest,
                {
                    headers: {
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
            const response = await axios.get<List[]>(`${import.meta.env.VITE_URL}/list/getalllistsbyuser`,
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
            const response = await axios.get<List>(`${import.meta.env.VITE_URL}/list/getlistbyid`,
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

    UpdateListQuery: async (listRequest: UpdateListRequest) => {
        try {
            const response = await axios.patch<List>(`${import.meta.env.VITE_URL}/list/updatelist`,
                listRequest,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log('response from updating list')
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error("Failed to fetch list:", error);
            throw error;
        }
    }
}