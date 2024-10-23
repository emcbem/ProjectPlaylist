import { useQuery } from "@tanstack/react-query";
import keys from "@/QueryKeys/GameKeys";
import { GameService } from "@/ApiServices/GameService";

export const GameQueries = {
  useGetAllGamesByNameQuery: (query: string) => {
    return useQuery({
      queryKey: keys.GameByName,
      queryFn: () => GameService.GetGamesByQuery(query),
    });
    /*
            example on how to use in a page
            const { data: userGameFromGame, isLoading, error } = useGetAllUserGamesByGameQuery(Number(gameId));
        */
  },

  useGetGameByIdQuery: (query: number) => {
    return useQuery({
      queryKey: keys.GameById,
      queryFn: () => GameService.GetGameById(query),
    });
  },

  // useFilterGameQuery: (request: GetGamesRequest) => {
  //   return useQuery(
  //     {
  //       queryKey: keys.
  //     }
  //   )
  // }
};
