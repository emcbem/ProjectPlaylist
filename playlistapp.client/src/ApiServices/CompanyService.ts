import { Company } from "@/@types/company";
import axios from "axios";

export const CompanyService = {
  GetAllCompanies: async () => {
    try {
      const response = await axios.get<Company[]>(
        `${import.meta.env.VITE_URL}/Company/getallcompanies`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get all companies");
      throw error;
    }
  },
};
