export interface Game {
    id: number;
    idgb_id: number;
    title: string;
    description: string;
    ageRating: string;
    publishDate: string;
    coverUrl: string;
}

export interface GameContextInterface {
    games: Game[];
    game: Game | undefined;
    gamesByQuery: Game[];
    error: string | undefined;
    isLoading: boolean;
}