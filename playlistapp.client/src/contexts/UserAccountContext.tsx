import React, { FC, ReactNode, useEffect, useState } from "react";
import { UserAccountContextInterface } from "../@types/userAccount";
import axios from "axios";
import { UserAccount } from "../@types/userAccount";

export const UserAccountContext = React.createContext<UserAccountContextInterface | null>(
    null
);

export const UserAccountContextProvider: FC<{children: ReactNode}> = ({children}) => {
    const [usr, setUserAccount] = useState<UserAccount>();
    const [error, seterror] = useState<string>("");
    const [isLoading, setisLoading] = useState<boolean>(false);
    // const { user, isAuthenticated } = useAuth0();

    const getUserById = async () => {
        try {
            const response = await axios.get<UserAccount>(`${import.meta.env.VITE_URL}/getusersbyname`, {
                params: {
                  userId: 'bar'
                }
              });
            return response.data;
        } catch (error) {
            console.error("Failed to fetch games:", error);
            throw error;
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getUserById();
                setUserAccount(data);
            } catch (err) {
                seterror("Failed to fetch games");
            } finally {
                setisLoading(false);
            }
        };

        getData();
    }, []);



    return (
        <UserAccountContext.Provider value={{usr, error, isLoading, getUserById}}>
            {children}
        </UserAccountContext.Provider>
    )
}