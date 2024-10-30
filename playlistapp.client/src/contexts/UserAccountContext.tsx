import React, { FC, ReactNode } from "react";
import { UserAccountContextInterface } from "../@types/userAccount";
import { useQuery } from "@tanstack/react-query";
import { UserAccountService } from "@/ApiServices/UserAccountService";
import { useAuth0 } from "@auth0/auth0-react";

export const UserAccountContext = React.createContext<UserAccountContextInterface | null>(
    null
);

export const UserAccountContextProvider: FC<{children: ReactNode}> = ({children}) => {
    const { user } = useAuth0();
    // console.log("User from auth0", user)

    const {data, isLoading, error} = useQuery({
        queryKey: ["UserAccount"],
        queryFn: () => UserAccountService.GetUserByUsername(user?.email), 
    })
    // console.log("User from query", data)

    return (
        <UserAccountContext.Provider value={{usr: data, error: error?.message, isLoading}}>
            {children}
        </UserAccountContext.Provider>
    )
}