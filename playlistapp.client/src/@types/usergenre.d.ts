import { Genre } from "./genre";
import { UserAccount } from "./userAccount";

export interface UserGenre {
    id: number,
    userId: number,
    genreId: number,
    genre: Genre,
    user: UserAccount,
}