import React, { FC, ReactNode } from "react";
import { UserGameContextInterface } from "../@types/usergame";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserGameService } from "@/ApiServices/UserGameService";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "./UserAccountContext";
import toast from "react-hot-toast";

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
    enabled: !!usr?.guid,
  });

  const addUserGame = useMutation({
    mutationFn: UserGameService.AddUserGame,
    onSuccess: () => {
      toast.success("Game added!")
      queryClient.invalidateQueries({ queryKey: ["UserGame"] });
    },
  });

  return (
    <UserGameContext.Provider
      value={{
        userGamesFromUser: userGamesByUser ?? [],
        error: gettingByUserError?.message,
        isLoading: gettingByUserLoading,
        AddUserGame: addUserGame.mutateAsync,
      }}
   
    >
      {children}
    </UserGameContext.Provider>
  );
};
