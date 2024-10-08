import { Platform } from "../@types/platform";
import axios from "axios";


export const PlatformService = {
    GetAllPlatforms: async () => {
        try {
            const response = await axios.get<Platform[]>(`${import.meta.env.VITE_URL}/Platform/getallplatforms`);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch games:", error);
            throw error;
        }
    }
}