import React, { FC, ReactNode } from "react";
import { GameContextInterface } from "../@types/game";
import { GameService } from "@/ApiServices/GameService";
import { useQuery } from "@tanstack/react-query";

export const GameContext = React.createContext<GameContextInterface | null>(
  null
);

export const GameContextProvidor: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {data, isLoading, error} = useQuery({
    queryKey: ["Game"],
    queryFn: GameService.GetAllGames,
  });

  return (
    <GameContext.Provider
      value={{ games: data ?? [], error: error?.message, isLoading }}
    >
      {children}
    </GameContext.Provider>
  );
};
