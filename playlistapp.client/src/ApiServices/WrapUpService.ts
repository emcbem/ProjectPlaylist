import { GetWrapUpRequest } from "@/@types/Requests/GetRequests/getWrapUpRequest";
import { WrapUp } from "@/@types/WrapUps/WrapUp";
import axios from "axios";
import toast from "react-hot-toast";

export const WrapUpService = {
  GetWrapUp: async (request: GetWrapUpRequest) => {
    try {
      const response = await axios.post<WrapUp>(
        `${import.meta.env.VITE_URL}/wrapup/getwrapup`,
        request
      );
      console.log(response.data);
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
