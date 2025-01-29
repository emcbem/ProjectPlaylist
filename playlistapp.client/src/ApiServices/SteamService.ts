import axios from "axios";

export const SteamService = {
  getDataFromSingleGame: async (userId: string) => {
    try {
      console.log("AHHHHHH");
      console.log("Steam Id From Steam Service ", userId);
      const response = await axios.get<string>(
        "https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=BC57910262595AF7BA3A78983581E07E&steamid=76561198989710406&format=json%22"
      );
      console.log("Response data ", response.data);
      return response.data;
    } catch (error) {
      console.error("something went wrong");
    }
  },
};
