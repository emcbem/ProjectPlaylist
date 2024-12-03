import { UserImageService } from "@/ApiServices/UserImageService"
import { useQuery } from "@tanstack/react-query"
import keys from "@/QueryKeys/UserImageKeys";

export const UserImageQueries = {
    useGetAllImages: () => {
        return useQuery({
            queryFn: () => UserImageService.useGetAllUserImages(),
            queryKey: keys.GetAllUserImages,
        })
    }
}