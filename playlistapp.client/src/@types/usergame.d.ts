import { PlatformGame } from "./platformGame";
import { AddUserGameRequest } from "./Requests/addUserGameRequest";
import { UserAccount } from "./userAccount";

export interface UserGame {
    userGameId: number,
    platformGame: PlatformGame,
    timePlayed: number,
    User: UserAccount,
    datAdded: Date,
}

export interface UserGameContextInterface {
    userGamesFromUser: UserGame[];
    userGamesFromGame: UserGame[];
    error: string | undefined;
    isLoading: boolean;
    AddUserGame: (gameRequest: AddUserGameRequest) => Promise<UserGame>;
    SetGameId: (gameId: number) => void;
}