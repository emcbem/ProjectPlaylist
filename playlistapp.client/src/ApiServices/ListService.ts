
import { List } from "@/@types/list";
import { AddListRequest } from "@/@types/Requests/addListRequest";
import axios from "axios";

export const ListService = {

    AddList: async (listRequest: AddListRequest) => {
        console.log(listRequest)
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
            console.log(listId)
            const response = await axios.get<List>(`${import.meta.env.VITE_URL}/list/getlistbyid`,
                {
                    params: {
                        listId: listId,
                    },
                }
            );
            console.log('response')
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error("Failed to fetch list:", error);
            throw error;
        }
    }
}