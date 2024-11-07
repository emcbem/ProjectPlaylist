import { AddUserGenreRequest } from "@/@types/Requests/AddRequests/addUserGenreRequest";
import { RemoveUserGenreRequest } from "@/@types/Requests/DeleteRequests/removeUserGenreRequest";
import { UserGenreService } from "@/ApiServices/UserGenreService";
import UserGenreKeys from "@/QueryKeys/UserGenreKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const UserGenreQueries = {
    useAddUserGenreQuery: (userGuid: string) => {
        const queryClient = useQueryClient();

        return useMutation({
            mutationFn: (addUserGenreRequest: AddUserGenreRequest) => UserGenreService.AddUserGenre(addUserGenreRequest),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: UserGenreKeys.AddUserGenre })
                queryClient.invalidateQueries({ queryKey: UserGenreKeys.GetAllUserGenresByUser(userGuid)})
            }
        })
    },
    useDeleteUserGenreQuery: (userGuid: string) => {
        const queryClient = useQueryClient();
        
        return useMutation({
            mutationFn: (removeUserGenreRequest: RemoveUserGenreRequest) => UserGenreService.DeleteUserGenre(removeUserGenreRequest),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: UserGenreKeys.DeleteUserGenre })
                queryClient.invalidateQueries({ queryKey: UserGenreKeys.GetAllUserGenresByUser(userGuid)})
            }
        })
    },
    useGetAllByUser: (userGuid: string) => {
        return useQuery({
            queryKey: UserGenreKeys.GetAllUserGenresByUser(userGuid),
            queryFn: () => UserGenreService.GetAllByUser(userGuid)
        })
    }
}