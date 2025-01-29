import axios from "axios";

export const SteamService = {
  getDataFromSingleGame: async (userId: string) => {
    try {
      console.log("AHHHHHH");
      console.log("Steam Id From Steam Service ", userId);
      const response = await axios.get<string>(
        ""
      );
      console.log("Response data ", response.data);
      return response.data;
    } catch (error) {
      console.error("something went wrong");
    }
  },
};
