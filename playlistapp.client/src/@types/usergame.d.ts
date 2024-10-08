import { PlatformGame } from "./platformGame";
import { UserAccount } from "./userAccount";

export interface UserGame {
    userGameId: number,
    platformGame: PlatformGame,
    timePlayed: number,
    User: UserAccount,
    datAdded: Date,
}

export interface UserGameContextInterface {
    userGames: UserGame[];
    error: string | undefined;
    isLoading: boolean;
}