import { UserGameService } from "@/ApiServices/UserGameService";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUserGamesByGameQuery = (gameId : number) => {
    console.log("gameId: ", gameId)
    return useQuery({
        queryKey: ["UserGameByGame"],
        queryFn: () => UserGameService.GetAllUserGamesByGame(gameId),
      });
} 