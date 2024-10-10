import { UserGameService } from "@/ApiServices/UserGameService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import keys from "@/QueryKeys/UserGameKeys"

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

  useDeleteUserGame: (userGameId: number) => {
    const queryClient = useQueryClient();
    console.log("userGameId: ", userGameId);

    return useMutation({
      mutationFn: () => UserGameService.DeleteUserGame(userGameId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.DeleteUserGame });
        console.log("User game deleted successfully.");
      },
      onError: (error) => {
        console.error("Error deleting user game: ", error);
      }
    });
  }
};
