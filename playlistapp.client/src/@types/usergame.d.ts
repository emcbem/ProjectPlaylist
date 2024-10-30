import { PlatformGame } from "./platformGame";
import { UserAccount } from "./userAccount";

export interface UserGame {
    userGameId: number,
    platformGame: PlatformGame,
    timePlayed: number,
    user: UserAccount,
    datAdded: Date,
}