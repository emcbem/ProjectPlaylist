import { SteamService } from "@/ApiServices/SteamService";
import keys from "@/QueryKeys/SteamKeys";
import { useQuery } from "@tanstack/react-query"

export const SteamQueries = {
    useGetUserDataForOneGame: (userSteamId: string) => {
        return useQuery({
            queryFn: () => SteamService.getDataFromSingleGame(userSteamId),
            queryKey: keys.GetSteamGamesBySteamId,
        })
    }
}