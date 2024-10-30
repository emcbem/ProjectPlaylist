import { useQuery } from "@tanstack/react-query";
import keys from "@/QueryKeys/PlatformGameKeys";
import { PlatformGameService } from "@/ApiServices/PlatformGameService";

export const PlatformGameQueries = {
  useGetAllPlatformGamesByGameId: (gameId: number) => {
    return useQuery({
      queryKey: keys.PlatformGameByGameId,
      queryFn: () => PlatformGameService.GetAllPlatfromGamesByGameId(gameId),
    });
  },
  useGetPlatformGamesById: (platformGameId: number) => {
    return useQuery({
      queryKey: keys.PlatformGameByGameId,
      queryFn: () => PlatformGameService.GetPlatformGamesById(platformGameId),
    });
  },
};
