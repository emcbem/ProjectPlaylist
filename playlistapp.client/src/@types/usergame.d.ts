import { PlatformGame } from "./platformGame";
import { UserAccount } from "./userAccount";

export interface UserGame {
    userGameId: Number,
    platformGame: PlatformGame,
    timePlayed: number,
    User: UserAccount,
    datAdded: Date,
}

export interface UserGameContextInterface {
    userGames: UserGame[];
    error: string;
    isLoading: boolean;
    fetchAllUserGames: (userGames: UserGame[]) => void;
    addUserGame: (userGameId: number) => void;
}