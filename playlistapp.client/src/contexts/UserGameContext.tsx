import React, { FC, ReactNode } from "react";
import { UserGameContextInterface } from "../@types/usergame";
import { useQuery } from "@tanstack/react-query";
import { UserGameService } from "@/ApiServices/UserGameService";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAccountContext } from "./UserAccountContext";

export interface AddUserGameRequest {
  UserId: string;
  PlatformGameId: number;
}

export const UserGameContext =
  React.createContext<UserGameContextInterface | null>(null);

export const UserGameContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { usr } = React.useContext(
    UserAccountContext
  ) as UserAccountContextInterface;

  console.log("user: ", usr)

  const { data, isLoading, error } = useQuery({
    queryKey: ["UserGame"],
    queryFn: () => UserGameService.GetAllUserGamesByUser(usr?.guid),
  });

  return (
    <UserGameContext.Provider
      value={{ userGames: data ?? [], error: error?.message, isLoading }}
    >
      {children}
    </UserGameContext.Provider>
  );
};
