import React, { FC, ReactNode, useEffect, useState } from "react";
import { UserGame, UserGameContextInterface } from "../@types/usergame";
import axios from "axios";



export const UserGameContext = React.createContext<UserGameContextInterface | null>(
    null
);

export const UserGameContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    // const { games } = React.useContext(GameContext) as GameContextInterface;
    const [userGames, setuserGames] = useState<UserGame[]>([]);
    const [error, seterror] = useState<string>("");
    const [isLoading, setisLoading] = useState<boolean>(false);

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

        // let currentGame = games.find(x => x.id === gameId);
        // var idbg_idToAdd = currentGame?.idgb_id;

        // let gameToAddToGame: Game = {
        //     id: 10000,
        //     idgb_id: Number(idbg_idToAdd),
        //     title: String(currentGame?.title),
        //     description: String(currentGame?.description),
        //     ageRating: String(currentGame?.ageRating),
        //     publishDate: String(currentGame?.publishDate),
        //     coverUrl: String(currentGame?.coverUrl)
        // }

        // let platform: Platform = { id: 1000, name: "platform", logoURL: "djfdjf.jpg" }

        // let PlatformGame: PlatformGame = { 
        //     id: 19209823,
        //      game: gameToAddToGame,
        //       platform: platform,
        //        platformURL: "dlkdjf.com",
        //         platformKey: "key" 
        //     }

        // let usr: User = {
        //     id: 5,
        //     username: "shusty",

        // }
        // let usr:User = {};

        // let usrGame: UserGame = {
        //     userGameId: 8347384,
        //     platformGame: PlatformGame,
        //     timePlayed: 0,
        //     User: usr;

        // }
        // id: number;
        //     game: Game;
        //     platform: Platform;
        //     platformURL: string;
        //     platformKey: string;



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