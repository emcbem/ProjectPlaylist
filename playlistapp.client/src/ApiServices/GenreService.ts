import { Genre } from "@/@types/genre";
import axios from "axios";

export const GenreService = {
    GetAllGenres: async () => {
        try {
            const response = await axios.get<Genre[]>(
                `${import.meta.env.VITE_URL}/Genre/getallgenres`,
            );
            return response.data;
        } catch (error) {
            console.error("Failed to fetch genres:", error);
            throw error;
        }
    }
}