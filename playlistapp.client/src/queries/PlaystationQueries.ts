import { PlaystationService } from "@/ApiServices/PlaystationService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import keys from "@/QueryKeys/PlaystationKeys";
import { PlaystationDTO } from "@/@types/Playstation/playstationDTO";

export const PlaystationQueries = {
  useGetPlaystationAccessToken: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: () =>
        PlaystationService.getPlaystationAuthenticationService(),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: keys.GetPlaystationAccessToken,
        });
      },
    });
  },
  useGetPlaystationUsersBasedOffUsername: (username: string) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: () =>
        PlaystationService.getPlaystationUsersByUsername(username),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: keys.GetPlaystationUsersByUsername(username),
        });
      },
    });
  },
  useOrchestrateInitialPlaystationAccountSync: (
    playstationDTO: PlaystationDTO
  ) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: () =>
        PlaystationService.orchestrateInitialPlaystationAccountSync(
          playstationDTO
        ),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: keys.OrchestrateInitialPlaystationAccountSync,
        });
      },
    });
  },
};
