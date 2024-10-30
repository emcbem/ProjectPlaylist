import { Achievement } from "./achievement";
import { Game } from "./game";
import { Platform } from "./platform";

export interface PlatformGame {
    id: number;
    platformKey: string;
    platformUrl: string;
    game: Game;
    platform: Platform;
}

export interface PlatformGameContextInterface {
    platformGames: PlatformGame[];
    error: string | undefined;
    isLoading: boolean;
    mutatePlatformGames: (newAddUserGameRequest) => Promise;
}