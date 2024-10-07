import axios from "axios";
import { Game } from "../@types/game";


export const GameService = {
    GetAllGames: async (): Promise<Game[]> => {
        try {
            const response = await axios.get<Game[]>(`${import.meta.env.VITE_URL}/game/getall`);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error("Failed to fetch games:", error);
            throw error;
        }
    }
}