export interface UserGame {
    Id: Number,
    UserId: Number,
    PlatformGameId: Number,
}

export interface UserGameContextInterface {
    userGames: UserGame[];
    error: string;
    isLoading: boolean;
    fetchAllUserGames: (userGames: UserGame[]) => void;
}