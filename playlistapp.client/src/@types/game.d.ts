export interface Game {
    id: number;
    idgb_id: number;
    title: string;
    description: string;
    ageRating: string;
    publishDate: Date;
    coverUrl: string;
}

export interface GameContextInterface {
    games: Game[];
    error: string;
    isLoading: boolean;
    fetchAllGames: (game: Game) => void;
}