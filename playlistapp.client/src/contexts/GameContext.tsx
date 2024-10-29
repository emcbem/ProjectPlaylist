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
  const {
    data: AllGames,
    isLoading: gettingAllGamesLoading,
    error: gettingAllGamesError,
  } = useQuery({
    queryKey: ["Game"],
    queryFn: GameService.GetAllGames,
  });

  // const {
  //   data: GetGameById,
  //   isLoading: gettingGameByIdLoading,
  //   error: gettingGameByIdError,
  // } = useQuery({
  //   queryKey: ["GameById"],
  //   queryFn: () => GameService.GetGameById(1)
  // });

  const { data: getGamesByQuery, isLoading: gettingGamesByQueryLoading, error: getGamesByQueryError } = useQuery({
    queryKey: ["Game"],
    queryFn: () => GameService.GetGamesByQuery("")
  })



  return (
    <GameContext.Provider
      value={{
        games: AllGames ?? [],
        game: undefined,
        gamesByQuery: getGamesByQuery ?? [],
        error: gettingAllGamesError?.message ?? "" ?? getGamesByQueryError?.message,
        isLoading: gettingAllGamesLoading ?? false ?? gettingGamesByQueryLoading
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
