import { AddListRequest } from "@/@types/Requests/addListRequest";
import { ListService } from "@/ApiServices/ListService";
import ListKeys from "@/QueryKeys/ListKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


export const ListQueries = {

    useAddListQuery: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (newList: AddListRequest) => ListService.AddList(newList),
            onSuccess: () => {
                toast.success("List added!")
                queryClient.invalidateQueries({ queryKey: [ListKeys.AddListKey] });
            },
        });
    },

    useGetListsByUserId: (userId: string) => {
        return useQuery({
            queryKey: ListKeys.GetListKey,
            queryFn: () => ListService.GetListsByUserId(userId),
        })
    },

    useGetListByListId: (listId: string) => {
        return useQuery({
            queryKey: ListKeys.Lists,
            queryFn: () => ListService.GetListByListId(Number(listId)),
        })
    },

    // useUpdateListQuery: ()

}