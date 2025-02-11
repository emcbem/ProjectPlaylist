import { ItemActionService } from "@/ApiServices/ItemActionService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import keys from "@/QueryKeys/ItemActionKeys";

export const ItemActionQueries = {
  useHandlePlatformCollisions: (url: string) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: () => ItemActionService.handlePlatformCollisions(url),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: keys.HandlePlatformCollisoins(url),
        });
      },
    });
  },
};
