import { useQuery } from "@tanstack/react-query";
import keys from "@/QueryKeys/GameKeys";
import { GameService } from "@/ApiServices/GameService";

export const GameQueries = {
  useGetAllGames: () => {
    return useQuery({
      queryKey: keys.GetAllGames,
      queryFn: () => GameService.GetAllGames(),
    });
  },
  useGetGameById: (gameId: number) => {
    return useQuery({
      queryKey: keys.GameById,
      queryFn: () => GameService.GetGameById(gameId),
    });
  },
  useGetAllGamesByQuery: (query: string) => {
    return useQuery({
      queryKey: keys.GameByName,
      queryFn: () => GameService.GetGamesByQuery(query),
    });
  },
};
