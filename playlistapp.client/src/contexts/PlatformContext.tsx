import React, { FC, ReactNode } from "react";
import { PlatformContextInterface } from "../@types/platform";
import { PlatformService } from "../ApiServices/PlatformService";
import { useQuery } from "@tanstack/react-query";

export const PlatformContext = React.createContext<PlatformContextInterface | null>(
    null
);

export const PlatformContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["Platform"],
    queryFn: PlatformService.GetAllPlatforms,
  });

  return (
    <PlatformContext.Provider
      value={{ platforms: data ?? [], error: error?.message, isLoading: isLoading }}
    >
      {children}
    </PlatformContext.Provider>
  );
};
