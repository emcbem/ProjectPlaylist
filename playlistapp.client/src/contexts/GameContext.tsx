import React, { FC, ReactNode } from "react";
import { GameContextInterface } from "../@types/game";
import { GameService } from "@/ApiServices/GameService";
import { useQuery } from "@tanstack/react-query";

interface GameContextProviderProps {
  children: ReactNode;
  gameId?: number;
}

export const GameContext = React.createContext<GameContextInterface | null>(
  null
);

export const GameContextProvidor: FC<GameContextProviderProps> = ({
  children,
  gameId
}) => {
  const {
    data: AllGames,
    isLoading: gettingAllGamesLoading,
    error: gettingAllGamesError,
  } = useQuery({
    queryKey: ["Game"],
    queryFn: GameService.GetAllGames,
  });

  const {
    data: GetGameById,
    isLoading: gettingGameByIdLoading,
    error: gettingGameByIdError,
  } = useQuery({
    queryKey: ["GameById"],
    queryFn: () => GameService.GetGameById(gameId),
    enabled: gameId !== undefined
  });

  return (
    <GameContext.Provider
      value={{
        games: AllGames ?? [],
        game: GetGameById ?? undefined,
        error: gettingAllGamesError?.message ?? gettingGameByIdError?.message,
        isLoading: gettingAllGamesLoading ?? gettingGameByIdLoading
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
