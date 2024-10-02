import React, { FC, ReactNode, useEffect, useState } from "react";
import { UserGame, UserGameContextInterface } from "../@types/usergame";
import axios from "axios";


export const UserGameContext = React.createContext<UserGameContextInterface | null>(
    null
);

export const UserGameContextProvidor: FC<{ children: ReactNode }> = ({ children }) => {
    const [userGames, setuserGames] = useState<UserGame[]>([]);
    const [error, seterror] = useState<string>("");
    const [isLoading, setisLoading] = useState<boolean>(false);

    const fetchAllUserGames = async () => {
        try {
            const response = await axios.get<UserGame[]>(`${import.meta.env.VITE_URL}/game/getall`);
            console.log(response)
            return response.data;
        } catch (error) {
            console.error("Failed to fetch games:", error);
            throw error;
        }
    };

    useEffect(() => {
        const getUserGames = async () => {
            try {
                const data = await fetchAllUserGames();
                setuserGames(data);
            } catch (err) {
                seterror("Failed to fetch games");
            } finally {
                setisLoading(false);
            }
        };

        getUserGames();
    }, []);

    return (
        <UserGameContext.Provider value={{ userGames, error, isLoading, fetchAllUserGames }}>
            {children}
        </UserGameContext.Provider>
    )

}