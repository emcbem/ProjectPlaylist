import { SteamService } from "@/ApiServices/SteamService";
import keys from "@/QueryKeys/SteamKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const SteamQueries = {
  useGetUserDataForOneGame: (userSteamId: string) => {
    console.log("query: ", userSteamId)
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () => SteamService.GetSteamUserActionLog(userSteamId),
      onSuccess: () => {
        queryClient.invalidateQueries({ 
          queryKey: keys.GetSteamUserActionLog 
        });
      },
    });
  },
};
