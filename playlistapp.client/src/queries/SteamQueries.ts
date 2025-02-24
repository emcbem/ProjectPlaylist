import { SteamActionLogRequest } from "@/@types/Requests/GetRequests/getSteamActionLogRequest";
import { SteamService } from "@/ApiServices/SteamService";
import keys from "@/QueryKeys/SteamKeys";
import {useQuery} from "@tanstack/react-query";

export const SteamQueries = {
  useGetSteamActionLog: (steamActionLogRequest: SteamActionLogRequest, enabled: boolean) => {
    return useQuery({
      queryFn: () =>
        SteamService.GetSteamUserActionLog(steamActionLogRequest),
      queryKey:  keys.GetSteamUserActionLog,
      enabled: enabled
    });
  },
};
