import React, { FC, ReactNode, useEffect } from "react";
import { UserAccountContextInterface } from "../@types/userAccount";
import { useQuery } from "@tanstack/react-query";
import { UserAccountService } from "@/ApiServices/UserAccountService";
import { useAuth0 } from "@auth0/auth0-react";
import useSessionStorage from "@/hooks/useSessionStorage";

export const UserAccountContext = React.createContext<UserAccountContextInterface | null>(
    null
);

export const UserAccountContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useAuth0();

    const [storedUserGuid, setStoredUserGuid] = useSessionStorage<string | undefined>("userGuid", undefined);

    console.log("Stored User GUID:", storedUserGuid);

    const { data, isLoading, error } = useQuery({
        queryKey: ["UserAccount"],
        queryFn: () => UserAccountService.GetUserByUsername(user?.email),
    })

    // update session storage
    useEffect(() => {
        if (data && data.guid) {
            setStoredUserGuid(data.guid); 
        }
    }, [data, setStoredUserGuid]);

    return (
        <UserAccountContext.Provider value={{ usr: data, userGuid: storedUserGuid, error: error?.message, isLoading }}>
            {children}
        </UserAccountContext.Provider>
    )
}