import React, { FC, ReactNode, useEffect, useState } from "react";
import { Platform, PlatformContextInterface } from "../@types/platform";
import axios from "axios";

export const PlatformContext = React.createContext<PlatformContextInterface | null>(
    null
);

export const PlatformContextProvider: FC<{children: ReactNode}> = ({children}) => {
    const [platforms, setplatforms] = useState<Platform[]>([]);
    const [error, seterror] = useState<string>("");
    const [isLoading, setisLoading] = useState<boolean>(false);

    const fetchAllPlatforms = async () => {
        try {
            const response = await axios.get<Platform[]>(`${import.meta.env.VITE_URL}/Platform/getallplatforms`);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch games:", error);
            throw error;
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchAllPlatforms();
                setplatforms(data);
            } catch (err) {
                seterror("Failed to fetch games");
            } finally {
                setisLoading(false);
            }
        };

        getData();
    }, []);



    return (
        <PlatformContext.Provider value={{platforms, error, isLoading, fetchAllPlatforms}}>
            {children}
        </PlatformContext.Provider>
    )
}