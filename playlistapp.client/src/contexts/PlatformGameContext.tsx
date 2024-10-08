import React, { FC, ReactNode } from "react";
import { PlatformGameContextInterface } from "../@types/platformGame";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlatformGameService } from "../ApiServices/PlatformGameService";
import { PlatformGameRequest } from "@/@types/Requests/getPlatformGameRequest";

export const PlatformGameContext =
  React.createContext<PlatformGameContextInterface | null>(null);

export const PlatformGameContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();

  const request: PlatformGameRequest = {
    PlatformId: 1,
    Filter: "",
  };

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: () => PlatformGameService.GetAllPlatformGames(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["PlatformGame"] });
    },
  });

  return (
    <PlatformGameContext.Provider
      value={{
        platformGames: data ?? [],
        error: error?.message,
        isLoading: isPending,
        mutatePlatformGames: mutateAsync,
      }}
    >
      {children}
    </PlatformGameContext.Provider>
  );
};
