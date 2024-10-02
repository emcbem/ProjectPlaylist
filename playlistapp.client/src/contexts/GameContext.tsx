import React, { FC, ReactNode, useEffect, useState } from 'react'
import { Game, GameContextInterface } from '../@types/game';
import axios from 'axios';

export const GameContext = React.createContext<GameContextInterface | null>(
    null
);

console.log(import.meta.env.VITE_URL);

export const GameContextProvidor: FC<{ children: ReactNode }> = ({ children }) => {

    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState<string>("");
    const [isLoading, setLoading] = useState(true);

    const fetchAllGames = async () => {
        try {
            const response = await axios.get<Game[]>(`${import.meta.env.VITE_URL}/game/getall`);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch games:", error);
            throw error;
        }
    };

    useEffect(() => {
        const getGames = async () => {
            try {
                const data = await fetchAllGames();
                setGames(data);
            } catch (err) {
                setError("Failed to fetch games");
            } finally {
                setLoading(false);
            }
        };
        
        getGames();
    }, []);

    return (
        <GameContext.Provider value={{games, error, isLoading, fetchAllGames}}>
            {children}
        </GameContext.Provider>
    )
}

