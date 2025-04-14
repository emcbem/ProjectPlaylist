import { GetWrapUpRequest } from "@/@types/Requests/GetRequests/getWrapUpRequest";
import { WrapUp } from "@/@types/WrapUps/WrapUp";
import axios from "axios";

export const WrapUpService = {
  GetWrapUp: async (request: GetWrapUpRequest) => {
    try {
      const response = await axios.post<WrapUp>(
        `${import.meta.env.VITE_URL}/wrapup/getwrapup`,
        request
      );
      return response.data;
    } catch (error) {
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
