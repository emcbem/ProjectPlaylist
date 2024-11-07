import { UserImage } from "@/@types/userImage";
import axios from "axios";

export const UserImageService = {
    useGetAllUserImages: async () => {
        try {
            const response = await axios.get<UserImage[]>(
                `${import.meta.env.VITE_URL}/image/getuserimages`
            );
            return response.data;
        } catch (error) {
            console.error("Failed to image");
            throw error;
        }
    }
}