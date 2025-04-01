import { updateNotificationRequest } from "@/@types/Requests/UpdateRequests/updateNotificationRequest";
import axios from "axios";
import { AuthenticationUtils } from "./AuthenticationUtils";

export const NotificationService = {
  UpdateNotification: async (request: updateNotificationRequest) => {
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      const response = await axios.post<number>(
        `${import.meta.env.VITE_URL}/notification/update`,
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
      console.error("Failed to update notification", error);
      throw error;
    }
  },

  RemoveNotification: async (id: number) => {
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      const response = await axios.delete<number>(
        `${import.meta.env.VITE_URL}/notification/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to remove notification", error);
      throw error;
    }
  },

  DeleteAllNotifications: async (userId: number) => {
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      console.log(jwtToken)
      const response = await axios.delete<number>(
        `${import.meta.env.VITE_URL}/Notification/deleteall/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to remove notifications", error);
      throw error;
    }
  },
};
