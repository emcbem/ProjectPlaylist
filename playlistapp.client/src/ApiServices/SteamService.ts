import axios from "axios"



export const SteamService = {
    getDataFromSingleGame: async (userId: string) => {
        // Steam Id:    76561198989710406
        //              76561199807777945
        console.log(userId);
        try {
            const response = await axios.post<string>('https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=BC57910262595AF7BA3A78983581E07E&steamid=76561198989710406&format=json%22')
            return response.data;
        } catch (error) {
            console.error("something went wrong")
        }
    }
}