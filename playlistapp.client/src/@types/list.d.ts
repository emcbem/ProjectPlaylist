import { UserAccount } from "./userAccount";

export interface List {
    id: number,
    userId: number,
    name: string,
    isPublic: boolean,
    dateMade: Date,
    listGames: ListGame[],
    user: UserAccount,
}