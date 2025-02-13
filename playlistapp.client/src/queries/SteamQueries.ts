import { SteamActionLogRequest } from "@/@types/Requests/GetRequests/getSteamActionLogRequest";
import { SteamService } from "@/ApiServices/SteamService";
import keys from "@/QueryKeys/SteamKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const SteamQueries = {
  useGetSteamActionLog: (steamActionLogRequest: SteamActionLogRequest) => {
    console.log("IN STEAM QUERY YAY");
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () =>
        SteamService.GetSteamUserActionLog(steamActionLogRequest),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: keys.GetSteamUserActionLog,
        });
      },
    });
  },
};
