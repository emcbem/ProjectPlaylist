import { UserAccount } from "./userAccount"
import { Game } from "./game"

export interface GameReview {
    lastEditDate: Date,
    publishDate: Date,
    game: Game,
    user: UserAccount,
    text: string,
    id: number,
    likes: number,
    dislikes: number,
    rating: number,
    playtimeAtReview: number,
    playtimeAtModification: number
}