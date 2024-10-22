const GameReviewKeys = {
    AddGameReview: ["GameReview", "AddGameReview"] as const,
    GetGameReviewById: ["GameReview", "GetGameReviewById"] as const,
    GetAllGameReviewsByGame: ["GameReview", "GetAllGameReviewsByGame"] as const,
    UpdateGameReview: ["GameReview", "UpdateGameReview"] as const,
    DeleteGameReview: ["GameReview", "DeleteGameReview"] as const,
}

export default GameReviewKeys