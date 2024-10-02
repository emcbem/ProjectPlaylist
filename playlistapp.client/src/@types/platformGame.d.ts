import { Game } from "./game";

export interface PlatformGame {
    id: number;
    game: Game;
    platform: Platform;
    platformURL: string;
    platformKey: string;
}