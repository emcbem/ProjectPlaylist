import { updateNotificationRequest } from "@/@types/Requests/UpdateRequests/updateNotificationRequest";
import axios from "axios";

export const NotificationService = {
    UpdateNotification: async (request: updateNotificationRequest) => {
        try {
            const response = await axios.post<number>(
                `${import.meta.env.VITE_URL}/notification/update`,
                request,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Failed to update notification", error);
            throw error;
        }
    },

    RemoveNotification: async (id: number) => 
    {
        try {
            const response = await axios.delete<number>(
                `${import.meta.env.VITE_URL}/notification/delete/${id}`,
            );
            return response.data;
        } catch (error) {
            console.error("Failed to update notification", error);
            throw error;
        }
    }
}