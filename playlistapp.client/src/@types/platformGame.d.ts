import { Achievement } from "./achievement";
import { Game } from "./game";
import { Platform } from "./platform";

export interface PlatformGame {
    id: number;
    platformKey: string;
    platformURL: string;
    game: Game;
    platform: Platform;
    achievements: Achievement[];
}
