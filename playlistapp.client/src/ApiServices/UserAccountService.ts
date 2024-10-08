import { UserAccount } from "@/@types/userAccount";
import axios from "axios";

export const UserAccountService = {
  GetUserByAuthId: async (name: string | undefined): Promise<UserAccount> => {

    if (!name) {
      console.error("Username is undefined or empty");
      throw new Error("Username must be provided.");
    }

    try {
      const response = await axios.get<UserAccount>(
        `${import.meta.env.VITE_URL}/User/getusersbyname`,
        {
          params: {
            username: name,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      throw error;
    }
  },
};
