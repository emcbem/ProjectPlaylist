import React, { FC, ReactNode } from "react";
import { UserGameContextInterface } from "../@types/usergame";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserGameService } from "@/ApiServices/UserGameService";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "./UserAccountContext";

interface UserGameContextProps {
  children: ReactNode;
  gameId?: number;
}

export const UserGameContext =
  React.createContext<UserGameContextInterface | null>(null);

export const UserGameContextProvider: FC<UserGameContextProps> = ({
  children,
  gameId,
}) => {
  const queryClient = useQueryClient();

  const { usr } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  const {
    data: userGamesByUser,
    isLoading: gettingByUserLoading,
    error: gettingByUserError,
  } = useQuery({
    queryKey: ["UserGameByUser"],
    queryFn: () => UserGameService.GetAllUserGamesByUser(usr?.guid),
  });

  const {
    data: userGamesByGame,
    isLoading: gettingByGameLoading,
    error: gettingByGameError,
  } = useQuery({
    queryKey: ["UserGameByGame"],
    queryFn: () => UserGameService.GetAllUserGamesByGame(gameId),
    enabled: gameId !== undefined,
  });

  const addUserGame = useMutation({
    mutationFn: UserGameService.AddUserGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["UserGame"] });
    },
  });

  return (
    <UserGameContext.Provider
      value={{
        userGames: userGamesByUser ?? userGamesByGame ?? [],
        error: gettingByUserError?.message ?? gettingByGameError?.message,
        isLoading: gettingByUserLoading ?? gettingByGameLoading,
        AddUserGame: addUserGame.mutateAsync,
      }}
    >
      {children}
    </UserGameContext.Provider>
  );
};
