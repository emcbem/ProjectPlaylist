import { SteamService } from "@/ApiServices/SteamService";
import keys from "@/QueryKeys/SteamKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const SteamQueries = {
  useGetUserDataForOneGame: (userSteamId: string) => {
    console.log("query: ", userSteamId);
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: () => SteamService.GetSteamUserActionLog(userSteamId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: keys.GetSteamUserActionLog,
        });
      },
    });
  },
  // useSteamAuthenticate: () => {
  //   console.log("authenticating in query");
  //   return useMutation({
  //     mutationFn: () => SteamService.AuthenticateWithSteam(),
  //     onSuccess: () => {
  //       // Optionally, you can invalidate or refetch any related queries here
  //       // queryClient.invalidateQueries({ queryKey: keys.SomeKey });
  //     },
  //     onError: (error) => {
  //       console.error("Steam authentication failed: ", error);
  //     },
  //   });
  // },
};
