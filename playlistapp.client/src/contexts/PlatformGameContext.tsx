import React, { FC, ReactNode } from "react";
import { PlatformGameContextInterface } from "../@types/platformGame";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlatformGameService } from "../ApiServices/PlatformGameService";

export const PlatformGameContext =
  React.createContext<PlatformGameContextInterface | null>(null);

export const PlatformGameContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();
  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: PlatformGameService.GetAllPlatformGames,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["PlatformGame"] });
    },
  });

  console.log(data)

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
