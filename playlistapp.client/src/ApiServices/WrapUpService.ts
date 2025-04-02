import { GetWrapUpRequest } from "@/@types/Requests/GetRequests/getWrapUpRequest";
import { WrapUp } from "@/@types/WrapUps/WrapUp";
import axios from "axios";
import toast from "react-hot-toast";

export const WrapUpService = {
  GetWrapUp: async (request: GetWrapUpRequest) => {
    try {
      const response = await axios.get<WrapUp>(
        `${import.meta.env.VITE_URL}/REPLACE`,
        {
          params: {
            userId: request.userId,
            month: request.month,
            year: request.year,
          },
        }
      );
      return response.data;
    } catch (error) {
      toast.error("Failed to fetch Wrap Up. Please try again later.");
      console.error(
        "Failed to fetch Wrap Up for month ",
        request.month,
        " and year ",
        request.year,
        " due to exception: ",
        error
      );
      throw error;
    }
  },
};
