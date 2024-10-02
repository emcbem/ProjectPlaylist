import { PlatformGame } from "./platformGame";
import { User } from "./userAccount";

export interface UserGame {
    userGameId: Number,
    platformGame: PlatformGame,
    timePlayed: number,
    User: User,
    datAdded: Date,
}

export interface UserGameContextInterface {
    userGames: UserGame[];
    error: string;
    isLoading: boolean;
    fetchAllUserGames: (userGames: UserGame[]) => void;
}