import { UserAccount } from "@/@types/userAccount";
import axios from "axios";

export const UserAccountService = {
  GetUserByUsername: async (username: string | undefined): Promise<UserAccount> => {
    if (!username) {
      console.error("Username was undefined or empty");
      throw new Error();
    }
    try {
      const response = await axios.get<UserAccount>(
        `${import.meta.env.VITE_URL}/User/getusersbyname`,
        {
          params: {
            username: username,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get user");
      throw error;
    }
  },
};
