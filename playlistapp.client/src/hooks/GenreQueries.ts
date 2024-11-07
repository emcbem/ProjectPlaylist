import { GenreService } from "@/ApiServices/GenreService"
import { useQuery } from "@tanstack/react-query"

export const GenreQueries = {
    useGetAllGenres: () => {
        return useQuery({
            queryKey: ["genres"],
            queryFn: () => GenreService.GetAllGenres()
        })
    }
}