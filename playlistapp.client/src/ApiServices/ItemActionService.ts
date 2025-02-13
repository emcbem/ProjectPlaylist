import axios from "axios";

export const ItemActionService = {
  handlePlatformCollisions: async (url: string) => {
    if (!url) {
      console.error("Platform collision url must be provided");
      throw new Error("Platform collision url was undefined or empty");
    }
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}${url}`);
      return response.data;
    } catch (error) {
      console.error("Failed to handle platform collisions");
      throw error;
    }
  },
};
