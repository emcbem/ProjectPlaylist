import { Achievement } from "./achievement";
import { Game } from "./game";
import { Platform } from "./platform";

export interface PlatformGame {
    id: number;
    gameId: number;
    platformId: number;
    platformKey: string;
    platformUrl: string;
    achievements: Achievement[];
    game: Game;
    platform: Platform;
    userGames: UserGame[];
}

export interface PlatformGameContextInterface {
    platformGames: PlatformGame[];
    error: string | undefined;
    isLoading: boolean;
    mutatePlatformGames: () => void;
}