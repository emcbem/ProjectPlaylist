import { UserImageService } from "@/ApiServices/UserImageService";
import { useQuery } from "@tanstack/react-query"

export const ImageQueries = {
    useGetImages: () => {
        return useQuery({
            queryFn: () => UserImageService.useGetAllUserImages(),
            queryKey: ["userImages"],
        });
    }
}