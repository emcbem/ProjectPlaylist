import { SteamService } from "@/ApiServices/SteamService";
import keys from "@/QueryKeys/SteamKeys";
import { useQuery } from "@tanstack/react-query";

export const SteamQueries = {
  useGetUserDataForOneGame: (userSteamId: string) => {
    console.log("User steam id", userSteamId);
    return useQuery({
      queryFn: () => SteamService.GetSteamUserActionLog(userSteamId),
      queryKey: keys.GetSteamUserActionLog,
    });
  },
};
