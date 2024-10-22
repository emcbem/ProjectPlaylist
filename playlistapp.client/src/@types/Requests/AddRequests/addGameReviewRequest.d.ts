export interface AddGameReviewRequest {
    gameId: number,
    userId: number,
    rating: number,
    text: string
}