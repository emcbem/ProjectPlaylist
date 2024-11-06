import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import keys from "@/QueryKeys/PlatformGameKeys";
import { PlatformGameService } from "@/ApiServices/PlatformGameService";
import { PlatformGameRequest } from "@/@types/Requests/GetRequests/getPlatformGameRequest";

export const PlatformGameQueries = {
  useGetAllPlatformGamesByGame: (gameId: number) => {
    return useQuery({
      queryKey: keys.PlatformGameByGameId,
      queryFn: () => PlatformGameService.GetAllPlatfromGamesByGame(gameId),
    });
  },
  useGetAllPlatformGames: (platfromGameRequest: PlatformGameRequest | undefined) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: () =>
        PlatformGameService.GetAllPlatformGames(platfromGameRequest),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: keys.GetAllPlatfromGames });
      },
    });
  },
};
