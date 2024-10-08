import { Achievement } from "./achievement";
import { Game } from "./game";
import { Platform } from "./platform";

export interface PlatformGame {
    Id: number;
    GameId: number;
    PlatformId: number;
    PlatformKey: string;
    PlatformUrl: string;
    Achievements: Achievement[];
    Game: Game;
    Platform: Platform;
    UserGames: UserGame[];
}

export interface PlatformGameContextInterface {
    platformGames: PlatformGame[];
    error: string;
    isLoading: boolean;
    fetchAllPlatformGames: (platformGames: PlatformGame[]) => void;
}