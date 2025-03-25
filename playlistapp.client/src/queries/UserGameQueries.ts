import { UserGameService } from "@/ApiServices/UserGameService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import keys from "@/QueryKeys/UserGameKeys";
import { AddUserGameRequest } from "@/@types/Requests/AddRequests/addUserGameRequest";
import { updateUserGameRequest } from "@/@types/Requests/UpdateRequests/updateUserGameRequest";
import toast from "react-hot-toast";

export const UserGameQueries = {
  useGetAllUserGamesByUser: (userId: string) => {
    return useQuery({
      queryFn: () => UserGameService.GetAllUserGamesByUser(userId),
      queryKey: keys.GetAllUserGamesByUser(userId),
    });
  },
  useGetUserGameByUserGameId: (userGameId: number) => {
    return useQuery({
      queryKey: keys.UserGameByGame,
      queryFn: () => UserGameService.GetUserGameByUserGameId(userGameId),
    });
    /*
    example on how to use in a page
    const { data: userGameFromGame, isLoading, error } = useGetAllUserGamesByGameQuery(Number(gameId));
    */
  },
  useDeleteUserGame: (userGuid: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: UserGameService.DeleteUserGame,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.DeleteUserGame });
        queryClient.invalidateQueries({
          queryKey: keys.GetAllUserGamesByUser(userGuid),
        });
        toast.success("User game deleted successfully");
      },
      onError: (error) => {
        console.error("Error deleting user game: ", error);
      },
    });
    /*
    example on how to use in a page
    const { mutate: deleteUserGame, isPending: isDeleting } =
      UserGameQueries.useDeleteUserGame();

    const handleDelete = (id: number) => {
    deleteUserGame(id);
    };
    */
  },
  useUpdateUserGame: (updateUserGameRequest: updateUserGameRequest) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: () => UserGameService.UpdateUserGame(updateUserGameRequest),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.UpdateUserGame });
        toast.success(`User game updated successfully`);
      },
      onError: (error) => {
        console.error("Error updating user game: ", error);
      },
    });
  },
  useAddUserGame: (addUserGameRequest: AddUserGameRequest | undefined) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: () => UserGameService.AddUserGame(addUserGameRequest),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.AddUserGame });
        toast.success(`Game Added`);
      },
    });
  },
};
