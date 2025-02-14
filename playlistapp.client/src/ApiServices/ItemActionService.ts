import axios from "axios";
import toast from "react-hot-toast";

export const ItemActionService = {
  handlePlatformCollisions: async (url: string) => {
    if (!url) {
      console.error("Platform collision url must be provided");
      throw new Error("Platform collision url was undefined or empty");
    }
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}${url}`);
      toast.success("Resolved collision");
      return response.data;
    } catch (error) {
      console.error("Failed to handle platform collisions");
      throw error;
    }
  },
};
