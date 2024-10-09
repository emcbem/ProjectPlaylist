import React, { FC, ReactNode, useState } from "react";
import { UserGameContextInterface } from "../@types/usergame";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserGameService } from "@/ApiServices/UserGameService";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "./UserAccountContext";
import { useGetAllUserGamesByGameQuery } from "@/hooks/useGetAllUserGamesByGameQuery";

export const UserGameContext =
  React.createContext<UserGameContextInterface | null>(null);

export const UserGameContextProvider: FC<{ children: ReactNode }> = ({
  children,
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

  const [gameId, setGameId] = useState<number>(0)

  const {
    data: userGamesByGame,
    isLoading: gettingByGameLoading,
    error: gettingByGameError,
  } = useGetAllUserGamesByGameQuery(gameId)

  const addUserGame = useMutation({
    mutationFn: UserGameService.AddUserGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["UserGame"] });
    },
  });

  return (
    <UserGameContext.Provider
      value={{
        userGamesFromUser: userGamesByUser ?? [],
        userGamesFromGame: userGamesByGame ?? [],
        error: gettingByUserError?.message ?? gettingByGameError?.message,
        isLoading: gettingByUserLoading ?? gettingByGameLoading,
        AddUserGame: addUserGame.mutateAsync,
        SetGameId: setGameId
      }}
   
    >
      {children}
    </UserGameContext.Provider>
  );
};
