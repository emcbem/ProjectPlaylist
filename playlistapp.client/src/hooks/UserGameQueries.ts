import { UserGameService } from "@/ApiServices/UserGameService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import keys from "@/QueryKeys/UserGameKeys";
import { AddUserGameRequest } from "@/@types/Requests/AddRequests/addUserGameRequest";
import { updateUserGameRequest } from "@/@types/Requests/UpdateRequests/updateUserGameRequest";

export const UserGameQueries = {
  useGetAllUserGamesByUserGameIdQuery: (userGameId: number) => {
    return useQuery({
      queryKey: keys.UserGameByGame,
      queryFn: () => UserGameService.GetAllUserGamesByUserGameId(userGameId),
    });
    /*
    example on how to use in a page
    const { data: userGameFromGame, isLoading, error } = useGetAllUserGamesByGameQuery(Number(gameId));
    */
  },
  useDeleteUserGame: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: UserGameService.DeleteUserGame,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.DeleteUserGame });
        console.log("User game deleted successfully.");
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
        console.log("User game updated successfully");
      },
      onError: (error) => {
        console.error("Error updating user game: ", error);
      },
    });
    /*
    const { mutate: updateUserGame, isPending: isUpdating } =
      UserGameQueries.useUpdateUserGame();

    const handleUpdateUserGame = async (userGame: UserGame) => {
      console.log("Handling an update");
      if (userGame) {
      const newUpdateUserGameRequest: updateUserGameRequest = {
        dateAdded: new Date(),
        userGameId: userGame.userGameId,
        timePlayed: userGame.timePlayed + 1,
      };
      updateUserGame(newUpdateUserGameRequest);
    }
  };
    */
  },
  useGetAllUserGamesByUser: (userId: string) => {
    return useQuery({
      queryFn: () => UserGameService.GetAllUserGamesByUser(userId),
      queryKey: keys.GetAllUserGamesByUser,
    });
  },
  useAddUserGame: (addUserGameRequest: AddUserGameRequest | undefined) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: () => UserGameService.AddUserGame(addUserGameRequest),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.AddUserGame });
      },
    });
  },
};
