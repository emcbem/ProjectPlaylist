import React, { FC, ReactNode, useEffect, useState } from "react";
import { PlatformGame, PlatformGameContextInterface } from "../@types/platformGame";
import axios from "axios";

export const PlatformGameContext = React.createContext<PlatformGameContextInterface | null>(
    null
);

export const PlatformGameContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [platformGames, setPlatformGames] = useState<PlatformGame[]>([]);
    const [error, seterror] = useState<string>("");
    const [isLoading, setisLoading] = useState<boolean>(false);

    const fetchAllPlatformGames = async () => {
        try {
            const response = await axios.get<PlatformGame[]>(`${import.meta.env.VITE_URL}/PlatformGame/getalltypes`);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch games:", error);
            throw error;
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchAllPlatformGames();
                setPlatformGames(data);
            } catch (err) {
                seterror("Failed to fetch games");
            } finally {
                setisLoading(false);
            }
        };

        getData();
    }, []);



    return (
        <PlatformGameContext.Provider value={{ platformGames, error, isLoading, fetchAllPlatformGames }}>
            {children}
        </PlatformGameContext.Provider>
    )
}