import { UserAccount } from "./userAccount";

export interface List {
    id: number,
    name: string,
    ownerName: string,
    isPublic: boolean,
    creationDate: Date,
    lastUpdatedDate: Date,
    games: ListGame[],
}