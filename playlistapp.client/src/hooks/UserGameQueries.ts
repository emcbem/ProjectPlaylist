import { UserGameService } from "@/ApiServices/UserGameService";
import { useQuery } from "@tanstack/react-query";

export const UserGameQueries = {
  useGetAllUserGamesByUserGameIdQuery: (userGameId: number) => {
    console.log("gameId: ", userGameId);

    return useQuery({
      queryKey: ["UserGameByGame"],
      queryFn: () => UserGameService.GetAllUserGamesByUserGameId(userGameId),
    });
    /*
    example on how to use in a page
    const { data: userGameFromGame, isLoading, error } = useGetAllUserGamesByGameQuery(Number(gameId));
    */
  },
};
