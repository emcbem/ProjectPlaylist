import { Game } from "./game";

export interface ListGame {
    id: number,
    listId: number,
    dateAdded: Date,
    game: Game,
}