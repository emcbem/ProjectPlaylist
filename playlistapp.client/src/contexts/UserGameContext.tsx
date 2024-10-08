import React, { FC, ReactNode, useEffect, useState } from "react";
import { UserGame, UserGameContextInterface } from "../@types/usergame";
import axios from "axios";
import { GameContext } from "./GameContext";
import { GameContextInterface } from "../@types/game";
import { PlatformGameContextInterface } from "../@types/platformGame";
import { PlatformGameContext } from "./PlatformGameContext";
import { useAuth0 } from "@auth0/auth0-react";

export interface AddUserGameRequest {
    UserId: string;
    PlatformGameId: number;
}

export const UserGameContext = React.createContext<UserGameContextInterface | null>(
    null
);

export const UserGameContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    // const { games } = React.useContext(GameContext) as GameContextInterface;
    // const { platformGames } = React.useContext(PlatformGameContext) as PlatformGameContextInterface;
    const [userGames, setuserGames] = useState<UserGame[]>([]);
    const [error, seterror] = useState<string>("");
    const [isLoading, setisLoading] = useState<boolean>(false);
    const { user, isAuthenticated } = useAuth0();

    const fetchUserGamesByUserUuid = async () => {
        try {
            const response = await axios.get<UserGame[]>(`${import.meta.env.VITE_URL}/UserGame/getusergamebyuser?userId=f776d4d8-a6f5-44db-9960-6165a1b1535b`);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch games:", error);
            throw error;
        }
    };

    useEffect(() => {
        const getUserGames = async () => {
            try {
                const data = await fetchUserGamesByUserUuid();
                setuserGames(data);
            } catch (err) {
                seterror("Failed to fetch games");
            } finally {
                setisLoading(false);
            }
        };

        getUserGames();
    }, []);

    const addUserGame = (gameId: number) => {
        console.log("Adding usergame!", gameId);

        let currentGame = games.find(x => x.id === gameId);
        
        let platformGame = platformGames.find(x => x.GameId === gameId);
        if (!platformGame) {
            throw new Error(`No platform game with game id ${gameId}`);
        }

        //let dateAdded = Date.now();

        //let timePlayed = 0;

        let usrGameToAdd: AddUserGameRequest = {
            UserId: "12345",
            PlatformGameId: platformGame.Id
        }
        console.log(usrGameToAdd)
        console.log(currentGame)
        console.log(user, isAuthenticated)

        //let addUserGameRequestObj :AddUserGameRequest ={UserId: "1", PlatformGameId: 1};
        // console.log(gameToAddToGame)
        // setuserGames([...userGames, gameToAddToGame])
    }

    return (
        <UserGameContext.Provider value={{ userGames, error, isLoading, fetchAllUserGames: fetchUserGamesByUserUuid, addUserGame }}>
            {children}
        </UserGameContext.Provider>
    )

}