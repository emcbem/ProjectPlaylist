import { ListGame } from "@/@types/listgame";

export interface UpdateListRequest {
    listId: number,
    listName: string,
    newGames: Game[],
    gamesToRemove: ListGame[],
    isPublic: boolean,
}