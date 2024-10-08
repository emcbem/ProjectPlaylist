import React, { FC, ReactNode } from "react";
import { UserGameContextInterface } from "../@types/usergame";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserGameService } from "@/ApiServices/UserGameService";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "./UserAccountContext";

export const UserGameContext =
  React.createContext<UserGameContextInterface | null>(null);

export const UserGameContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { usr } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["UserGame"],
    queryFn: () => UserGameService.GetAllUserGamesByUser(usr?.guid),
  });

  const addUserGame = useMutation({
    mutationFn: UserGameService.AddUserGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["UserGame"]})
    }
  })

  return (
    <UserGameContext.Provider
      value={{ userGames: data ?? [], error: error?.message, isLoading, AddUserGame: addUserGame.mutateAsync }}
    >
      {children}
    </UserGameContext.Provider>
  );
};
